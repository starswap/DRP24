import os

from flask import Flask, jsonify, request
import tempfile
from whitenoise import WhiteNoise
from openai import OpenAI
client = OpenAI(api_key=os.environ['OPENAI_API_KEY'])

SLIM_TRANSCRIPTION = True

app = Flask(__name__)
app.wsgi_app = WhiteNoise(app.wsgi_app, root="../frontend/build", index_file=True)

@app.route('/api/post_audio', methods=['POST'])
def audio_transcribe():
    # Extract transcription
    transcription = extract_transcript(request)

    # Error if subject not present
    if 'subject' not in request.form:
        return jsonify({'error': 'No extraction type queried'}), 400
    subject = request.form['subject']

    # Reduce the size of the transcription
    if SLIM_TRANSCRIPTION:
        transcription = client.chat.completions.create(
            model="gpt-4o",
            response_format={"type": "json_object"},
            messages=[
                {"role": "user", "content": f"Extract the most concise {subject} from this piece of text and return it as json with the key {subject}: {transcription.text}"}
            ]
        )
        print(transcription)
        result = transcription.choices[0].message.content

    print(result)
    return result

@app.route('/api/post_conversation', methods=['POST'])
def conversation_transcribe():
    # Extract transcription
    transcription = extract_transcript(request)

    prompt = f"""
        Extract the concise activity, people, time and place 
        from the piece of text and return it as json with the following entries:
            {{
                "activity": the activity,
                "people": list of people [],
                "time": the time in the form hour/day,
                "place": the place
            }}
        If it is unclear what to write fill in the gaps with 'NA'.
        Do this on this text: {transcription}
        
        For example, given the piece of text:
          I want to go to pub with bertha and gertrude tomorrow at 1
        The result would be:
            {{
                "activity": "go to pub"
                "people": ["Bertha", "Gertrude"]
                "time": 1/Tomorrow,
                "place": "pub"
            }}
    """

    response = client.chat.completions.create(
        model="gpt-4o",
        response_format={"type": "json_object"},
        messages=[
            {"role": "user",
             "content": prompt}
        ]
    )
    result = response.choices[0].message.content
    return result



# Extracts transcript from a request containing audio
def extract_transcript(request):
    print(request.files)
    if 'audio' not in request.files:
        return jsonify({'error': 'No audio file attached in the request'}), 400

    audio = request.files['audio']
    if audio.filename == '':
        return jsonify({'error': 'Audio filename is blank'}), 400

    # Create a temporary file
    temp = tempfile.NamedTemporaryFile(delete=False, suffix='.wav')
    temp.write(audio.read())
    temp.flush()  # Ensure all data is written to the file

    # Get the temporary file path
    temp_file_path = temp.name

    print(temp_file_path)

    audio_file = open(temp_file_path, "rb")
    transcription = client.audio.transcriptions.create(
        model="whisper-1",
        file=audio_file
    )

    return transcription

if __name__ == '__main__':
    app.run()