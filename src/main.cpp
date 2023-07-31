#include <Arduino.h>
#include <DHT.h>

#define DHTPIN 2         // DHT22 data pin connected to Arduino pin 2
#define DHTTYPE DHT22    // Change this to DHT11 if you are using the DHT11 sensor

DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(9600);
  dht.begin();
}

void loop() {
  delay(2000);  // Wait for 2 seconds between readings (adjust as needed)

  // Reading temperature or humidity takes about 250 milliseconds!
  float temperature = dht.readTemperature();
  float humidity = dht.readHumidity();

  // Check if any reads failed and exit early (to try again).
  if (temperature == NAN || humidity == NAN) {
    Serial.println("Failed to read from DHT sensor!");
    return;
  }

  // Print temperature and humidity to the Serial monitor.
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.print(" °C\tHumidity: ");
  Serial.print(humidity);
  Serial.println(" %");

  // Send the data to the computer over the serial interface.
  Serial.print("T:");
  Serial.print(temperature);
  Serial.print(",H:");
  Serial.println(humidity);
}
