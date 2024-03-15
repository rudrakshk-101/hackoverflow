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
String moistureData = "";
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

WiFi.mode(WIFI_STA);

 Serial.println("Connected to WiFi");
 Serial.println(WiFi.localIP());

 // Route for root / web page
server.on("/dustbin", HTTP_GET, [](AsyncWebServerRequest *request){
    Serial.println("Arrived request");
    StaticJsonDocument<200> jsonDoc;
    jsonDoc["sensorData"] = sensorData;
    String jsonData;
    serializeJson(jsonDoc, jsonData);
    AsyncResponseStream *response = request->beginResponseStream("application/json");
    response->addHeader("Access-Control-Allow-Origin", "*"); 
    response->print(jsonData);
    request->send(response);
});

server.on("/", HTTP_GET, [](AsyncWebServerRequest *request){
    Serial.println("Arrived request");
    StaticJsonDocument<200> jsonDoc;
    jsonDoc["ABCD"] = "ABCD";
    String jsonData;
    serializeJson(jsonDoc, jsonData);
    AsyncResponseStream *response = request->beginResponseStream("application/json");
    response->addHeader("Access-Control-Allow-Origin", "*"); 
    response->print(jsonData);
    request->send(response);
});

server.on("/moisture", HTTP_GET, [](AsyncWebServerRequest *request){
  Serial.println("Arrived request");
    StaticJsonDocument<200> jsonDoc;
    jsonDoc["moistureData"] = moistureData;
    String jsonData;
    serializeJson(jsonDoc, jsonData);
    AsyncResponseStream *response = request->beginResponseStream("application/json");
    response->addHeader("Access-Control-Allow-Origin", "*"); 
    response->print(jsonData);
    request->send(response);
});

 // Start the server
 server.begin();
}

String getValue(String data, char separator, int index) {
 int found = 0;
 int strIndex[] = {0, -1};
 int maxIndex = data.length()-1;

 for(int i=0; i<=maxIndex && found<=index; i++){
    if(data.charAt(i)==separator || i==maxIndex){
        found++;
        strIndex[0] = strIndex[1]+1;
        strIndex[1] = (i == maxIndex) ? i+1 : i;
    }
 }

 return found>index ? data.substring(strIndex[0], strIndex[1]) : "";
}

void loop() {
 if (arduinoUno.available()) {
    String str = arduinoUno.readStringUntil('\n'); // Use readStringUntil to read until newline
    sensorData = getValue(str,'/',0);
    moistureData = getValue(str,'/',1);
    sensorData.trim(); // Remove any leading/trailing whitespace
    moistureData.trim();
 } 
}