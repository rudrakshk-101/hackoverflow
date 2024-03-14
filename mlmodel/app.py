from flask import Flask, render_template, request, send_file, redirect, url_for, Response
from flask_cors import CORS
import cv2
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload():
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    if file:
        filename = secure_filename(file.filename)
        upload_dir = 'uploads'
        if not os.path.exists(upload_dir):
            os.makedirs(upload_dir)
        file.save(os.path.join(upload_dir, filename))
        process_video(filename)
        return redirect(url_for('video_feed', filename=filename))

def process_video(filename):
    # Your video processing code here
    pass

@app.route('/video_feed/<filename>')
def video_feed(filename):
    return Response(generate_frames(filename), mimetype='multipart/x-mixed-replace; boundary=frame')

def generate_frames(filename):
    cap = cv2.VideoCapture(os.path.join('uploads', filename))
    car_cascade = cv2.CascadeClassifier('cars.xml')
    while True:
        success, frame = cap.read()
        if not success:
            break
        else:
            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            cars = car_cascade.detectMultiScale(gray, scaleFactor=1.2, minNeighbors=1)
            for (x, y, w, h) in cars:
                cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 0, 255), 2)
            ret, buffer = cv2.imencode('.jpg', frame)
            frame = buffer.tobytes()
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

if __name__ == '__main__':
    app.run(debug=True)
