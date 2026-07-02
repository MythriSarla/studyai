import os
import json
import re
from groq import Groq
from app.prompts.ai_prompts import (
    SUMMARY_PROMPT,
    FLASHCARD_PROMPT,
    QUIZ_PROMPT,
    WEAK_TOPICS_PROMPT,
    STUDY_SCHEDULE_PROMPT
)

client = Groq(api_key=os.getenv("GROQ_API_KEY"))
MODEL = "llama-3.3-70b-versatile"


def call_groq(prompt, max_tokens=2048):
    """Base function to call Groq API with error handling."""
    response = client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": prompt}],
        max_tokens=max_tokens,
        temperature=0.7,
    )
    return response.choices[0].message.content


def parse_json_response(text):
    """Safely extract and parse JSON from AI response."""
    text = re.sub(r"```json\s*", "", text)
    text = re.sub(r"```\s*", "", text)
    text = text.strip()
    return json.loads(text)


def generate_summary(text):
    """Generate a structured AI summary of study material."""
    prompt = SUMMARY_PROMPT.format(text=text[:8000])
    return call_groq(prompt, max_tokens=2048)


def generate_flashcards(text):
    """Generate 10 flashcards from study material."""
    prompt = FLASHCARD_PROMPT.format(text=text[:8000])
    response = call_groq(prompt, max_tokens=2048)
    return parse_json_response(response)


def generate_quiz(text):
    """Generate MCQ, True/False, and Short Answer questions."""
    prompt = QUIZ_PROMPT.format(text=text[:8000])
    response = call_groq(prompt, max_tokens=3000)
    return parse_json_response(response)


def generate_weak_topic_analysis(text, score, wrong_topics):
    """Analyze weak topics based on quiz performance."""
    prompt = WEAK_TOPICS_PROMPT.format(
        text=text[:4000],
        score=score,
        wrong_topics=", ".join(wrong_topics) if wrong_topics else "various topics"
    )
    return call_groq(prompt, max_tokens=1500)


def generate_study_schedule(topics, weak_areas, hours_per_day=2, exam_date="in 7 days"):
    """Generate a personalized 7-day study schedule."""
    prompt = STUDY_SCHEDULE_PROMPT.format(
        topics=", ".join(topics),
        weak_areas=", ".join(weak_areas) if weak_areas else "none identified yet",
        hours_per_day=hours_per_day,
        exam_date=exam_date
    )
    response = call_groq(prompt, max_tokens=3000)
    return parse_json_response(response)
