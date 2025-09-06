import os
import dotenv
import google.generativeai as genai

from .roadmap_generator import generate_roadmap
from .resume_generator import generate_resume
from .pdf_utils import export_pdf

dotenv.load_dotenv()
# genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

genai.configure(api_key="AIzaSyB_aAXh-gDkwUokngkpqUL4cBJDcSgfgtU")
# Generate only roadmap
def generate_ai_roadmap(user_data):
    return generate_roadmap(user_data)


# Generate resume + PDF (takes roadmap as input)
def generate_ai_resume(user_data, roadmap):
    resume = generate_resume(user_data, roadmap)
    pdf_path = export_pdf(resume)
    return {
        "resume": resume,
        "pdf_path": pdf_path
    }
