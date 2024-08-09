# PZEM-004T Energy Monitoring System

## Overview

This project utilizes the PZEM-004T energy monitoring device in conjunction with an ESP8266 microcontroller to create a comprehensive energy monitoring system. The system is designed to read and display real-time data of electrical appliances and household consumption on a web-based interface.

## Features

- **Real-time Data Monitoring**: Displays real-time measurements of:
  - **Voltage** (V)
  - **Current** (A)
  - **Power** (W)
  - **Energy** (kWh)
  - **Frequency** (Hz)
  - **Power Factor** (PF)

- **Web Interface**: Data is shown on a user-friendly website, allowing easy access and monitoring.
- 
---- OPTIONAL -----
- **Historical Data Storage**: Records and stores energy consumption data to a database, enabling users to track and compare monthly usage trends.
--------------------
## Components

- **PZEM-004T**: A versatile energy meter capable of measuring voltage, current, power, energy, frequency, and power factor.
- **ESP8266**: A Wi-Fi microcontroller that interfaces with the PZEM-004T and hosts the web server for data visualization.


## How It Works

1. **Data Acquisition**: The ESP8266 communicates with the PZEM-004T to retrieve real-time data.
2. **Data Display**: The retrieved data is sent to a web server hosted on the ESP8266, which presents the data in a visual format on a webpage.
4. **Monitoring**: Users can view current energy usage and historical data through the web interface to monitor and optimize their energy consumption.

## Setup Instructions

1. **Connect the PZEM-004T** to the ESP8266 using the appropriate UART pins.
2. **Upload the Firmware**: Use the Arduino IDE to upload the provided code to the ESP8266.
3. **Access the Web Interface**: Connect to the ESP8266’s IP address in a web browser to view the data.

## Notes

- Ensure that the PZEM-004T is correctly connected and powered to get accurate readings.
- The web interface will display "Not Available" if the PZEM-004T is not communicating correctly if it displays '1' meaning esp8266 and pzem004t is communicating and is working.

## License


## Acknowledgements

- [PZEM-004T Datasheet](https://innovatorsguru.com/wp-content/uploads/2019/06/PZEM-004T-V3.0-Datasheet-User-Manual.pdf)

