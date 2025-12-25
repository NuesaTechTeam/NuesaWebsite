import requests
import re

BASE_URL = "https://textbooks-1093886938384.europe-west1.run.app"

# PROBLEM EVERYWHERE

def get_courses(params):
    print(f"DEBUG: Fetching courses with params: {params}")
    try:
        response = requests.get(f"{BASE_URL}/api/courses", params=params)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching courses: {e}")
        return []

def search_documents(params):
    print(f"DEBUG: Searching docs with params: {params}")
    try:
        response = requests.get(f"{BASE_URL}/api/search", params=params)
        response.raise_for_status()
        data = response.json()
        print(f"SUCCESS: Found {data.get('total', 0)} documents.")
        return data
    except Exception as e:
        print(f"Error searching docs: {e}")
        return None

def normalize_query(q):
    if not q: return ""
    trimmed = q.strip()
    match = re.search(r'^([a-zA-Z]{3})\s*(\d{2,4})$', trimmed)
    if match:
        return f"{match.group(1).upper()} {match.group(2)}"
    return trimmed.upper()

def simulate_frontend_search(user_query, is_pq_locked=False):
    print(f"\n--- Simulating Search for: '{user_query}' (PQ Checked: {is_pq_locked}) ---")
    normalized = normalize_query(user_query)
    
    params = {}
    
    if is_pq_locked:
        params['course_code'] = "PQ"
    else:
        final_course_code = None
        final_keyword = None
        
        if user_query:
            # Check pattern
            match = re.search(r'^([a-zA-Z]{3})\s*(\d{2,4})$', normalized)
            if match:
                print("Logic: Matches course code pattern directly.")
                final_course_code = normalized
            else:
                print("Logic: Does not match pattern. Trying to resolve via API...")
                courses = get_courses({'q': user_query})
                # Strict check
                simple_query = normalized.replace(" ", "")
                course_match = next((c for c in courses if c['code'].replace(" ", "") == simple_query), None)
                
                if course_match:
                    print(f"Logic: Resolved to course {course_match['code']}")
                    final_course_code = course_match['code']
                else:
                    print("Logic: No course resolution. Using as KEYWORD.")
                    final_keyword = normalized
        
        if final_course_code:
            params['course_code'] = final_course_code
        if final_keyword:
            params['q'] = final_keyword

    return search_documents(params)



# 1. Direct Course Code
simulate_frontend_search("EEE 313")

# 2. General Keyword 
simulate_frontend_search("thermodynamics")

# 3. Fuzzy Course Code (
simulate_frontend_search("cve 200") 

# 4. PQ Locked
simulate_frontend_search("", is_pq_locked=True)
