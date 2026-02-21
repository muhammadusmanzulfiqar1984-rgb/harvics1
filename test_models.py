
import os
from dotenv import load_dotenv
from google import genai

load_dotenv()
api_key = os.environ.get("GEMINI_API_KEY")

if not api_key:
    print("No API key found")
    exit(1)

client = genai.Client(api_key=api_key)

try:
    # Try to generate content with a known stable model first to see if it works
    print("Testing gemini-2.0-flash...")
    response = client.models.generate_content(
        model="gemini-2.0-flash",
        contents="Hello",
    )
    print("Success with gemini-2.0-flash!")
    print(response.text)
except Exception as e:
    print(f"Failed with gemini-2.0-flash: {e}")

try:
    # Try gemini-1.5-flash
    print("\nTesting gemini-1.5-flash...")
    response = client.models.generate_content(
        model="gemini-1.5-flash",
        contents="Hello",
    )
    print("Success with gemini-1.5-flash!")
    print(response.text)
except Exception as e:
    print(f"Failed with gemini-1.5-flash: {e}")
