import google.generativeai as genai
import os
import dotenv

dotenv.load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_resume(user_data, roadmap):
    prompt = f"""
    User details: {user_data}
    Roadmap: {roadmap}
    Generate an ATS-friendly resume for this user based on the above information.
    """
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    return response.text