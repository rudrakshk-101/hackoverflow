#include<ArduinoJson.h>
#include <WiFi.h>
#include <ESPAsyncWebServer.h>
#include <SoftwareSerial.h>

// Replace with your network credentials
const char* ssid = "Pillai";
const char* password = "pillai@hocl";

// Create an instance of the server
AsyncWebServer server(80);

// Software Serial object to interface with Arduino Uno
SoftwareSerial arduinoUno(5, 18); // TX,RX

// Variable to store the latest sensor data
String sensorData = "";

void setup() {
 // Initialize serial communication for debugging
 Serial.begin(115200);
 arduinoUno.begin(9600); // Start software serial communication with Arduino Uno

 // Connect to Wi-Fi
 WiFi.begin(ssid, password);
 while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
 }
 Serial.println("Connected to WiFi");
 Serial.println(WiFi.localIP());

 // Route for root / web page
server.on("/dustbin", HTTP_POST, [](AsyncWebServerRequest *request){

    // Create a JSON object
    StaticJsonDocument<200> jsonDoc;
    jsonDoc["sensorData"] = sensorData;

    // Serialize the JSON object to a string, automatically escaping control characters
    String jsonData;
    serializeJson(jsonDoc, jsonData);

    AsyncResponseStream *response = request->beginResponseStream("application/json");
    response->addHeader("Access-Control-Allow-Origin", "*"); // Allow any origin to access
    response->print(jsonData);
    request->send(response);
});

 // Start the server
 server.begin();
}

void loop() {
 // Check if data is available from Arduino Uno
 if (arduinoUno.available()) {
    sensorData = arduinoUno.readString();
    Serial.println("hello");
    Serial.println(sensorData);
 } 
}


