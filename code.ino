#include <PZEM004Tv30.h>
#include <SoftwareSerial.h>
#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

// Define software serial pins
#if !defined(PZEM_RX_PIN) && !defined(PZEM_TX_PIN)
#define PZEM_RX_PIN D5
#define PZEM_TX_PIN D6
#endif

#define SSID "Your_Wifi_SSID"
#define PASSWORD "Your_Wifi_Password"

SoftwareSerial pzemSWSerial(PZEM_RX_PIN, PZEM_TX_PIN);
PZEM004Tv30 pzem(pzemSWSerial);

ESP8266WebServer server(80);


void setup() {
  Serial.begin(115200);
  Serial.println("");

  WiFi.begin(SSID, PASSWORD);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting...");
  }

  Serial.println();
  Serial.println("Connected to Wi-Fi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP());

  // Initialize Software Serial for PZEM
  pzemSWSerial.begin(9600);
  delay(5000); 
  Serial.println("Setup complete.");

  Serial.print("PZEM address: ");
  Serial.println(pzem.readAddress(), HEX);
  // Set up the server to handle requests
  server.on("/", handleRoot);
  server.begin();

  Serial.println("HTTP server started");
}

void loop() {
  server.handleClient();    
}

void handleRoot() {
  Serial.println("Received request, reading sensor...");

  uint8_t address = pzem.readAddress();
  //This is only to test if your can fetch a data from you esp8266/server
  float test = random(100, 200) + random(0, 1000) / 1000.0;
  // Read the data from the sensor
  float voltage = pzem.voltage();
  float current = pzem.current();
  float power = pzem.power();
  float energy = pzem.energy();
  float frequency = pzem.frequency();
  float pf = pzem.pf();

  // Check if the readings are valid
  if (isnan(voltage) || isnan(current) || isnan(power) || isnan(energy) || isnan(frequency) || isnan(pf)) {
    Serial.println("Error reading sensor data");
  } else {
    Serial.println("Raw Sensor Data:");
    Serial.print("Test: ");         Serial.println(test);
    Serial.print("Voltage: ");      Serial.println(voltage);
    Serial.print("Current: ");      Serial.println(current);
    Serial.print("Power: ");        Serial.println(power);
    Serial.print("Energy: ");       Serial.println(energy);
    Serial.print("Frequency: ");    Serial.println(frequency);
    Serial.print("Power Factor: "); Serial.println(pf);
  }


  String json = "{";
  json += "\"address\": \"" + String((address == 0) ? "Not Available" : String(address)) + "\"" + ",";
  json += "\"test\": " + String(test) + ",";
  json += "\"voltage\": " + String(isnan(voltage) ? 0 : voltage) + ",";
  json += "\"current\": " + String(isnan(current) ? 0 : current) + ",";
  json += "\"power\": " + String(isnan(power) ? 0 : power) + ",";
  json += "\"energy\": " + String(isnan(energy) ? 0 : energy) + ",";
  json += "\"frequency\": " + String(isnan(frequency) ? 0 : frequency) + ",";
  json += "\"pf\": " + String(isnan(pf) ? 0 : pf);
  json += "}";

  // Set CORS headers
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.sendHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  server.sendHeader("Access-Control-Allow-Headers", "Content-Type");

  // Send the JSON response
  server.send(200, "application/json", json);
  Serial.println("Sensor read complete, sent response: " + json);
  Serial.println();
  delay(2000);
}