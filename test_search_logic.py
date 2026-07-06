import requests

BASE_URL = "https://r2-to-firestore-worker.nasurf25.workers.dev"
HEADERS = {"x-api-key": "nuesa123"}

def search_documents(params):
    print(f"DEBUG: Searching docs with params: {params}")
    try:
        response = requests.get(BASE_URL, params=params, headers=HEADERS)
        print(f"DEBUG: search_documents response: {response.status_code}")
        response.raise_for_status()
        data = response.json()
        docs = data.get('documents', [])
        print(f"SUCCESS: Found {data.get('total', 0)} documents (Total field).")
        print(f"DEBUG: len(documents) returned: {len(docs)}")
        if docs:
            print(f"DEBUG: First document: {docs[0]}")
        return data
    except Exception as e:
        print(f"Error searching docs: {e}")
        return None

print("\n Testing EEE 313 Search")
res = search_documents({'course_code': 'EEE 313'})

print("\nTesting 'EEE'")
search_documents({'department_code': 'EEE', 'limit': 10})

print("\nTesting 300 lvl search")
search_documents({'level': '300', 'limit': 10})
