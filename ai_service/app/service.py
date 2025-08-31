import google.generativeai as genai
import os
import dotenv

from .roadmap_generator import generate_roadmap
from .resume_generator import generate_resume
from .pdf_utils import export_pdf

dotenv.load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def generate_full_package(user_data):
    # Generate roadmap using AI
    roadmap = generate_roadmap(user_data)
    # Generate resume using AI
    resume = generate_resume(user_data, roadmap)
    # Export resume as PDF
    pdf_path = export_pdf(resume)
    return {
        "roadmap": roadmap,
        "resume": resume,
        "pdf_path": pdf_path
    }