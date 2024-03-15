from flask import Flask, render_template, request, send_file, redirect, url_for, Response, jsonify
from flask_cors import CORS
import pickle
import cv2
import numpy as np # Ensure numpy is imported for array operations
import os
from werkzeug.utils import secure_filename
import requests # Import requests for making HTTP requests

# Define or import your config object here
# For example, if you have a config.py file:
# from config import Config
# app.config.from_object(Config)
# Or directly define the API key:
WEATHER_API_KEY = '9d7cde1f6d07ec55650544be1631307e'

crop_recommendation_model_path = 'models/RandomForest.pkl'
crop_recommendation_model = pickle.load(open(crop_recommendation_model_path, 'rb'))

def weather_fetch(city_name):
    api_key = WEATHER_API_KEY # Use the defined API key
    base_url = "http://api.openweathermap.org/data/2.5/weather?"

    complete_url = base_url + "appid=" + api_key + "&q=" + city_name
    response = requests.get(complete_url)
    x = response.json()

    if x["cod"] != "404":
        y = x["main"]

        temperature = round((y["temp"] - 273.15), 2)
        humidity = y["humidity"]
        return temperature, humidity
    else:
        return None

app = Flask(__name__)
CORS(app) # Enable CORS for all routes

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/transmitMLHighSystem')
def transmitHigh():
    return render_template('transmitMLHighSystem.html')

@app.route('/transmitMLLowSystem')
def transmitLow():
    return render_template('transmitMLLowSystem.html')

@app.route('/crop-predict', methods=['POST'])
def crop_prediction():
    title = 'Smart Agriculture System'
    response = {'title': title}
    data = request.get_json()

    if data:
        N = int(data['nitrogen'])
        P = int(data['phosphorous'])
        K = int(data['pottasium'])
        ph = float(data['ph'])
        rainfall = float(data['rainfall'])
        city = data.get("city")

        if weather_fetch(city) != None:
            temperature, humidity = weather_fetch(city)
            input_data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
            my_prediction = crop_recommendation_model.predict(input_data)
            final_prediction = my_prediction[0]
            response['prediction'] = final_prediction
        else:
            response['status'] = 'failure'
            response['message'] = 'Weather data not available for the city.'

    return jsonify(response)

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
