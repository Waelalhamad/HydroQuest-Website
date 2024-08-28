#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <OneWire.h>
#include <DallasTemperature.h>

const char* ssid = "Anashomsi";
const char* password = "12345678";

const char* serverUrl = "http://192.168.0.252:8080/data";

#define ONE_WIRE_BUS D2
OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature sensors(&oneWire);

WiFiClient client;

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("Connected to WiFi");
}

void loop() {
  sensors.requestTemperatures();
  float temperatureC = sensors.getTempCByIndex(0);

  if (temperatureC != DEVICE_DISCONNECTED_C) {
    float temperatureK = temperatureC + 273.15;

    if (WiFi.status() == WL_CONNECTED) {
      HTTPClient http;
      http.begin(client, serverUrl);  // Use the updated API

      // JSON payload
      String payload = "{\"temperature_celsius\":" + String(temperatureC) + ", \"temperature_kelvin\":" + String(temperatureK) + "}";
      http.addHeader("Content-Type", "application/json");

      int httpResponseCode = http.POST(payload);

      if (httpResponseCode > 0) {
        Serial.println("Data sent successfully: " + payload);
      } else {
        Serial.println("Error sending data: " + http.errorToString(httpResponseCode));
      }

      http.end();
    } else {
      Serial.println("Error: Not connected to WiFi.");
    }
  } else {
    Serial.println("Error: Could not read temperature data.");
  }

  delay(500); // Send data every 5 seconds
}
