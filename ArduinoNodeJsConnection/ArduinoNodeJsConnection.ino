const int ledPin = 9;  // led pin with PWM option
int brightnessPercent = 0;

void setup() {
  Serial.begin(9600);    // baudrate same as on server
  pinMode(ledPin, OUTPUT);
}

void loop() {
  
  // data ready to read?
  if (Serial.available() > 0) {
    String inputString = Serial.readStringUntil('\n'); // Read until newline
    brightnessPercent = inputString.toInt(); // Convert string to integer
  }

  setLEDBrightness(brightnessPercent);
}

// Sets led's brightness
void setLEDBrightness(int brightnessPercent) {
  // Ensure brightness is between 0 and 100
  brightnessPercent = constrain(brightnessPercent, 0, 100);
  
  // Map percent onto PWM value
  int pwmValue = map(brightnessPercent, 0, 100, 0, 255);
  
  // Set brightness on LED
  analogWrite(ledPin, pwmValue);
}
