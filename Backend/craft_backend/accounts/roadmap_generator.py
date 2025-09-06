import google.generativeai as genai

import os
import dotenv

dotenv.load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_roadmap(user_data):
    if not isinstance(user_data, dict):
        if hasattr(user_data, '__dict__'):
            user_data = {k: v for k, v in user_data.__dict__.items() if not k.startswith('_')}
        else:
            raise TypeError("user_data must be a dictionary or have a __dict__ attribute")

    prompt = f"""
    You are a career coach AI. Based on the following student details, generate a personalized career roadmap:
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

    Output:
    1. List the student's current strengths (pros) and weaknesses (cons).
    2. Summarize achievements so far.
    3. Suggest clear goals to achieve next.
    4. List specific skills to learn for career growth.
    5. For project development, suggest 3 project ideas for each level:
       - Beginner
       - Intermediate
       - Pro
    Format your response as a structured JSON object with keys: pros_cons, achievements, goals, skills_to_learn, projects.
    """

    # ✅ use a supported model
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    return response.text
