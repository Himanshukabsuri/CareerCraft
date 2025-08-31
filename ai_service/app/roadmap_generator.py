# import sys
# import os
# sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
# from ai_services.gemini_utils import ask_gemini
# def generate_roadmap(user_data):
#     """
#     Generates a career roadmap based on user data.
#     Returns:
#         {
#             "pros_cons": {"pros": [...], "cons": [...]},
#             "roadmap": [step1, step2, ...],
#             "skills_to_learn": [...],
#             "projects": {
#                 "beginner": [project1, project2, project3],
#                 "intermediate": [project1, project2, project3],
#                 "pro": [project1, project2, project3]
#             }
#         }
#     """
#     # Example logic (replace with AI/ML or rules as needed)
#     pros = ["Strong analytical skills", "Motivated learner"]
#     cons = ["Limited experience in chosen field"]


#     roadmap = [
#         "Research potential career paths",
#         "Identify required skills and qualifications",
#         "Create a learning plan with milestones",
#         "Build a portfolio of projects",
#         "Network with professionals in the field",
#         "Complete foundational courses",
#         "Build beginner projects",
#         "Advance to intermediate skills",
#         "Work on intermediate projects",
#         "Apply for internships",
#         "Master advanced topics",
#         "Build pro-level projects",
#         "Apply for full-time roles"
   
#     ]

#     skills_to_learn = ["Skill1", "Skill2", "Skill3"]

#     projects = {
#         "beginner": ["Project1", "Project2", "Project3"],
#         "intermediate": ["Project1", "Project2", "Project3"],
#         "pro": ["Project1", "Project2", "Project3"]
#     }

#     return {
#         "pros_cons": {"pros": pros, "cons": cons},
#         "roadmap": roadmap,
#         "skills_to_learn": skills_to_learn,
#         "projects": projects
#     }

import google.generativeai as genai
import os
import dotenv

dotenv.load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=api_key)


def generate_roadmap(user_data):
    prompt = f"""
    User details: {user_data}
    Generate a personalized career roadmap including:
    - Current situation (pros/cons)
    - Achievements so far
    - Goals to achieve
    - Skills to learn
    - 3 projects each for beginner, intermediate, and pro level.
    """
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    return response.text