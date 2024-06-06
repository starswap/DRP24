from flask import Flask, jsonify, request
import whisper
import tempfile
from whitenoise import WhiteNoise

app = Flask(__name__) 
app.wsgi_app = WhiteNoise(app.wsgi_app, root="../frontend/build", index_file=True)

model = whisper.load_model("base")

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
    result = model.transcribe(temp_file_path)
    print(result)
    return jsonify({'text': result})


if __name__ == '__main__':
    app.run()