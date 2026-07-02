SUMMARY_PROMPT = """You are an expert academic tutor. Analyze the following study material and create a comprehensive, well-structured summary.

Your summary must include:
1. **Main Topic**: One sentence describing what this material is about
2. **Key Concepts**: 5-8 most important concepts with brief explanations
3. **Important Definitions**: Key terms and their definitions
4. **Core Ideas**: The main ideas explained clearly
5. **Examples**: Notable examples mentioned in the material
6. **Exam Tips**: 3-5 things a student should remember for exams

Format your response in clean markdown with proper headings and bullet points.
Keep it concise but comprehensive. Focus on what students need to know.

Study Material:
{text}"""


FLASHCARD_PROMPT = """You are an expert academic tutor creating flashcards for students.

Analyze the following study material and generate exactly 10 flashcards.
Each flashcard should test an important concept, definition, or fact.

You MUST respond with ONLY valid JSON in this exact format, no other text:
{{
  "flashcards": [
    {{
      "id": 1,
      "front": "Question or concept here",
      "back": "Answer or explanation here"
    }}
  ]
}}

Make questions clear and specific. Answers should be concise but complete.
Cover the most important topics from the material.

Study Material:
{text}"""


QUIZ_PROMPT = """You are an expert academic tutor creating a quiz for students.

Analyze the following study material and generate a quiz with:
- 5 Multiple Choice Questions (MCQ) with 4 options each
- 3 True/False Questions
- 2 Short Answer Questions

You MUST respond with ONLY valid JSON in this exact format, no other text:
{{
  "mcq": [
    {{
      "id": 1,
      "question": "Question here",
      "options": ["A) Option1", "B) Option2", "C) Option3", "D) Option4"],
      "correct_answer": "A) Option1",
      "explanation": "Why this is correct"
    }}
  ],
  "true_false": [
    {{
      "id": 1,
      "question": "Statement here",
      "correct_answer": true,
      "explanation": "Why this is true/false"
    }}
  ],
  "short_answer": [
    {{
      "id": 1,
      "question": "Question here",
      "sample_answer": "A good sample answer"
    }}
  ]
}}

Make questions test understanding, not just memorization. Base everything strictly on the provided material.

Study Material:
{text}"""


WEAK_TOPICS_PROMPT = """You are an academic performance analyzer.

A student scored {score}% on a quiz about the following study material.
The questions they got wrong were about: {wrong_topics}

Analyze this and provide:
1. **Weak Areas**: Specific topics the student struggles with
2. **Root Causes**: Why they might be struggling
3. **Improvement Plan**: Step-by-step plan to improve
4. **Focus Topics**: Top 3 topics to study immediately
5. **Resources**: Types of resources that would help

Format in clean markdown. Be specific, encouraging, and actionable.

Study Material Summary:
{text}"""


STUDY_SCHEDULE_PROMPT = """You are an expert academic coach creating a personalized study schedule.

Student Profile:
- Topics to study: {topics}
- Weak areas: {weak_areas}
- Available study hours per day: {hours_per_day}
- Target exam date: {exam_date}

Create a detailed 7-day study schedule that:
1. Prioritizes weak areas
2. Includes daily tasks with time estimates
3. Has revision sessions built in
4. Balances all topics appropriately
5. Includes breaks and self-care reminders

You MUST respond with ONLY valid JSON in this exact format, no other text:
{{
  "schedule": [
    {{
      "day": 1,
      "date": "Day 1",
      "focus": "Main focus topic",
      "tasks": [
        {{
          "time": "9:00 AM - 10:30 AM",
          "task": "Task description",
          "duration": "90 mins",
          "priority": "high"
        }}
      ],
      "daily_goal": "What to achieve today"
    }}
  ]
}}"""
