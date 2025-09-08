# import google.generativeai as genai
# import os
# import dotenv

# dotenv.load_dotenv()
# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
# def generate_resume(user_data, roadmap):
#     if not isinstance(user_data, dict):
#         # Try to convert Django model instance to dict
#         if hasattr(user_data, '__dict__'):
#             user_data = {k: v for k, v in user_data.__dict__.items() if not k.startswith('_')}
#         else:
#             raise TypeError("user_data must be a dictionary or have a __dict__ attribute")
#     prompt = f"""
#     You are an expert resume writer. Using the following student details and their personalized career roadmap, generate an ATS-friendly resume:
#     Student details:
#     Name: {user_data.get('name')}
#     Date of Birth: {user_data.get('dob')}
#     Email: {user_data.get('email')}
#     Phone: {user_data.get('phone')}
#     Address: {user_data.get('address')}
#     Qualification: {user_data.get('qualification')}
#     College: {user_data.get('college')}
#     Course: {user_data.get('course')}
#     Branch: {user_data.get('branch')}
#     Interests: {user_data.get('interest')}
#     Skills: {user_data.get('skill')}

#     Roadmap: {roadmap}

#     - Highlight relevant skills and achievements.
#     - Include suggested projects (from roadmap) in a 'Projects' section, categorized by level (Beginner, Intermediate, Pro).
#     - Ensure the resume is ATS-friendly (simple formatting, clear sections, keywords).
#     - Output only the resume text.
#     """
#     model = genai.GenerativeModel('gemini-pro')
#     response = model.generate_content(prompt)
#     return response.text

import google.generativeai as genai
import os
import dotenv
from .pdf_utils import export_pdf  # to generate PDF

dotenv.load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_resume(user_data, roadmap):
    """
    user_data must be a dict structured like:
    {
        "personal": {
            "name": "John Doe",
            "dob": "2002-01-01",
            "email": "john@example.com",
            "phone": "1234567890",
            "address": "New Delhi, India",
            "linkedin": "https://linkedin.com/in/john",
            "github": "https://github.com/john",
            "portfolio": "https://john.dev"
        },
        "education": [
            {"level": "B.Tech", "course": "CSE", "college": "DIT", "year": "2025", "score": "8.2 CGPA"},
            {"level": "12th", "school": "XYZ School", "year": "2021", "score": "92%"},
            {"level": "10th", "school": "ABC School", "year": "2019", "score": "89%"}
        ],
        "skills": ["Python", "Django", "React", "AI/ML"],
        "projects": [
            {
                "title": "AI Resume Builder",
                "description": "Built an AI-powered ATS resume generator using Django + Gemini API.",
                "github": "https://github.com/john/ai-resume",
                "live": "https://resume-ai.vercel.app"
            },
            {
                "title": "Court Case Scraper",
                "description": "Scraped Delhi HC case data with Selenium & Flask.",
                "github": "https://github.com/john/court-scraper",
                "live": ""
            }
        ],
        "languages": ["English", "Hindi"]
    }
    """

    # Safety: allow model instances too
    if not isinstance(user_data, dict):
        if hasattr(user_data, '__dict__'):
            user_data = {k: v for k, v in user_data.__dict__.items() if not k.startswith('_')}
        else:
            raise TypeError("user_data must be a dictionary or have a __dict__ attribute")

    prompt = f"""
    You are an expert resume writer. Create a professional ATS-friendly resume
    in plain text format with the following details:

    PERSONAL DETAILS:
    {user_data.get("personal")}

    EDUCATION:
    {user_data.get("education")}

    SKILLS:
    {user_data.get("skills")}

    PROJECTS:
    {user_data.get("projects")}

    LANGUAGES:
    {user_data.get("languages")}

    CAREER ROADMAP:
    {roadmap}

    Resume Format:
    1. Full Name + Contact (Email, Phone, LinkedIn, GitHub, Portfolio)
    2. Objective (AI-generated, based on roadmap & user data)
    3. Education (reverse chronological order, clean layout)
    4. Skills (bullet points, ATS keywords)
    5. Projects (with GitHub/Live links if available)
    6. Languages

    Rules:
    - No extra commentary, output only resume text.
    - Keep formatting ATS-friendly (simple, plain text, consistent headers).
    """

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt)
    resume_text = response.text.strip()

    # ✅ Save as PDF
    pdf_filename = f"{user_data['personal']['name'].replace(' ', '_')}_resume.pdf"
    pdf_path = export_pdf(resume_text, filename=pdf_filename)

    return {
        "resume": resume_text,
        "pdf_path": pdf_path
    }
