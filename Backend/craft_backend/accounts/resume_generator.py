# import google.generativeai as genai
# import os
# import dotenv

# dotenv.load_dotenv()

# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# def generate_resume(user_data, roadmap):
#     prompt = f"""
#     User details: {user_data}
#     Roadmap: {roadmap}
#     Generate an ATS-friendly resume for this user based on the above information.
#     """
#     model = genai.GenerativeModel('gemini-pro')
#     response = model.generate_content(prompt)
#     return response.text


import google.generativeai as genai
import os
import dotenv

dotenv.load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
# genai.configure(api_key="AIzaSyB_aAXh-gDkwUokngkpqUL4cBJDcSgfgtU")
def generate_resume(user_data, roadmap):
    if not isinstance(user_data, dict):
        # Try to convert Django model instance to dict
        if hasattr(user_data, '__dict__'):
            user_data = {k: v for k, v in user_data.__dict__.items() if not k.startswith('_')}
        else:
            raise TypeError("user_data must be a dictionary or have a __dict__ attribute")
    prompt = f"""
    You are an expert resume writer. Using the following student details and their personalized career roadmap, generate an ATS-friendly resume:
    Student details:
    Name: {user_data.get('name')}
    Date of Birth: {user_data.get('dob')}
    Email: {user_data.get('email')}
    Phone: {user_data.get('phone')}
    Address: {user_data.get('address')}
    Qualification: {user_data.get('qualification')}
    College: {user_data.get('college')}
    Course: {user_data.get('course')}
    Branch: {user_data.get('branch')}
    Interests: {user_data.get('interest')}
    Skills: {user_data.get('skill')}

    Roadmap: {roadmap}

    - Highlight relevant skills and achievements.
    - Include suggested projects (from roadmap) in a 'Projects' section, categorized by level (Beginner, Intermediate, Pro).
    - Ensure the resume is ATS-friendly (simple formatting, clear sections, keywords).
    - Output only the resume text.
    """
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    return response.text