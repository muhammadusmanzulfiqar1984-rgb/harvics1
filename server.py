import os
from dotenv import load_dotenv

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from google import genai  # ✅ NEW SDK

load_dotenv(override=True)

api_key = os.environ.get("GEMINI_API_KEY")
if not api_key:
    raise RuntimeError("GEMINI_API_KEY environment variable is not set.")

client = genai.Client(api_key=api_key)   # ✅ ADD THIS


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8003", "http://127.0.0.1:8003"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AskRequest(BaseModel):
    prompt: str

@app.post("/api/ask-ai")
async def ask_ai(body: AskRequest):
    prompt = body.prompt.strip()
    if not prompt:
        raise HTTPException(status_code=400, detail="Prompt must not be empty.")
    
    # Prepend brand context to make the AI smarter about the specific business
    context = (
        "You are the intelligent assistant for HARVICS, a premium textile and apparel brand. "
        "Your goal is to assist customers with our products which include: "
        "Men, Ladies, Lingerie, Kids, Home Textiles, Kitchen, Towels, Shoes. "
        "Be helpful, professional, and concise. "
        "If asked about products, assume they are available in our store. "
        "User Query: "
    )
    full_prompt = f"{context}\n{prompt}"
    
    # Try multiple models in order (fallback strategy)
    # Using verified models from API list
    models_to_try = [
        "gemini-2.0-flash-lite",      # Verified available
        "gemini-2.0-flash",           # Verified available (but hits quota often)
        "gemini-2.0-flash-001",       # Verified available
        "gemini-flash-latest",        # Verified available
        "gemini-pro-latest"           # Verified available
    ]
    last_exception = None

    for model_name in models_to_try:
        try:
            print(f"Attempting to call model: {model_name}")
            resp = client.models.generate_content(
                model=model_name,
                contents=full_prompt,
            )
            text_ans = getattr(resp, "text", "") or ""
            return {"answer": text_ans}
        except Exception as exc:
            print(f"Error calling Gemini ({model_name}): {exc}")
            last_exception = exc
            # If 429 (quota) or 404 (not found) or 400 (invalid arg/model), continue to next model
            # We want to be aggressive with fallback
            continue
            
    # If all failed, raise the last exception
    print(f"All models failed. Last error: {last_exception}")
    raise HTTPException(status_code=500, detail=f"All AI models failed. Last error: {str(last_exception)}")




app.mount("/", StaticFiles(directory=".", html=True), name="static")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run("server:app", host="0.0.0.0", port=8004, reload=True)
