import os
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from google import genai
from google.genai import types
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

@csrf_exempt
def analyze_code(request):
    if request.method == "POST":
        try:
            # Handle both JSON and form data
            if request.content_type == 'application/json':
                data = json.loads(request.body)
                code_snippet = data.get("code_snippet")
            else:
                code_snippet = request.POST.get("code_snippet")
            
            if not code_snippet:
                return JsonResponse({"error": "No code_snippet provided in the request."}, status=400)
                
            # Initialize Gemini client
            # It will automatically use the GEMINI_API_KEY environment variable
            client = genai.Client()
            
            system_prompt = (
                "Act as a Senior Developer. Analyze the following code snippet. "
                "Provide a one-paragraph plain-English summary of what it does, "
                "a bulleted list of required dependencies, and brief instructions "
                "on how to test it. Format the response strictly in Markdown."
            )
            
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=code_snippet,
                config=types.GenerateContentConfig(
                    system_instruction=system_prompt,
                ),
            )
            
            return JsonResponse({"response": response.text})
            
        except json.JSONDecodeError:
            return JsonResponse({"error": "Invalid JSON payload."}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
            
    return JsonResponse({"error": "Only POST requests are allowed."}, status=405)
