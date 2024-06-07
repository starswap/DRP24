from flask import Flask, jsonify, request
import tempfile
from whitenoise import WhiteNoise
from openai import OpenAI
client = OpenAI()


app = Flask(__name__) 
app.wsgi_app = WhiteNoise(app.wsgi_app, root="../frontend/build", index_file=True)

@app.route('/api/post_audio', methods=['POST'])
def audio_transcribe():
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
    
    audio_file= open(temp_file_path, "rb")
    transcription = client.audio.transcriptions.create(
        model="whisper-1", 
        file=audio_file
    )
    return jsonify({"text": transcription.text})


if __name__ == '__main__':
    app.run()