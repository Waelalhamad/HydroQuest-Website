#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <WebSocketsClient.h>

// GPS
SoftwareSerial gpsSerial(D4, D3);  // RX, TX

// WiFi
const char* ssid = "Anashomsi";
const char* password = "12345678";

// WebSocket server
WebSocketsClient webSocket;
const char* webSocketServer = "192.168.0.252";  // Node.js server IP
const uint16_t webSocketPort = 3000;

void setup() {
  Serial.begin(115200);
  gpsSerial.begin(9600);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");

  // Connect to WebSocket server
  webSocket.begin(webSocketServer, webSocketPort, "/");
  webSocket.onEvent(webSocketEvent);

  // WebSocket auto reconnection
  webSocket.setReconnectInterval(1000);
}

void loop() {
  webSocket.loop();

  if (gpsSerial.available()) {
    String gpsData = gpsSerial.readStringUntil('\n');
    
    // Parse GPS data if it's valid
    if (gpsData.startsWith("$GPGGA")) {  // GPGGA provides essential fix data
      String jsonData = parseGPSData(gpsData);
      if (jsonData != "") {
        webSocket.sendTXT(jsonData);
      }
    }
  }
}

// Handle WebSocket events
void webSocketEvent(WStype_t type, uint8_t * payload, size_t length) {
  switch (type) {
    case WStype_DISCONNECTED:
      Serial.println("Disconnected from WebSocket server");
      break;
    case WStype_CONNECTED:
      Serial.println("Connected to WebSocket server");
      break;
    case WStype_TEXT:
      Serial.printf("Received message: %s\n", payload);
      break;
  }
}

// Parse GPS data and convert to JSON
String parseGPSData(String gpsData) {
  // Extract latitude and longitude from GPGGA string
  // Example data: $GPGGA,123456.78,1234.56,N,12345.67,W,...

  int commaIndex = gpsData.indexOf(',') + 1; // Time (skip)
  commaIndex = gpsData.indexOf(',', commaIndex) + 1; // Latitude
  String latitude = gpsData.substring(commaIndex, gpsData.indexOf(',', commaIndex));
  
  commaIndex = gpsData.indexOf(',', commaIndex) + 1; // N/S Indicator
  String latDir = gpsData.substring(commaIndex, gpsData.indexOf(',', commaIndex));
  
  commaIndex = gpsData.indexOf(',', commaIndex) + 1; // Longitude
  String longitude = gpsData.substring(commaIndex, gpsData.indexOf(',', commaIndex));
  
  commaIndex = gpsData.indexOf(',', commaIndex) + 1; // E/W Indicator
  String lonDir = gpsData.substring(commaIndex, gpsData.indexOf(',', commaIndex));

  if (latitude.length() > 0 && longitude.length() > 0) {
    String json = "{\"latitude\":\"" + latitude + latDir + "\",\"longitude\":\"" + longitude + lonDir + "\"}";
    return json;
  }
  
  return "";
}
