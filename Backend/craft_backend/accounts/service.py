from django.conf import settings
import google.generativeai as genai

from .roadmap_generator import generate_roadmap
from .resume_generator import generate_resume
from .pdf_utils import export_pdf

# ✅ configure Gemini ONCE using Django settings
genai.configure(api_key=settings.GEMINI_API_KEY)

# Generate only roadmap
def generate_ai_roadmap(user_data):
    return generate_roadmap(user_data)

# Generate resume + PDF
def generate_ai_resume(user_data, roadmap):
    resume = generate_resume(user_data, roadmap)
    pdf_path = export_pdf(resume)
    return {
        "resume": resume,
        "pdf_path": pdf_path
    }
print("GEMINI KEY:", settings.GEMINI_API_KEY[:6])
