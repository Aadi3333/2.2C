const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://aadi333:Aadimahala70154@cluster0.wstqz17.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

const sensor = require('./models/node');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const node = require('./models/node');

const serial_port = new SerialPort({
    path: 'COM3',
    baudRate: 9600
});

const parser = new ReadlineParser();
serial_port.pipe(parser);


parser.on('data', async (data) => {
    // Assuming data is in a JSON format like { sensorValue: 123 }
    try {
        const sensorData = JSON.parse(data);

        const document = await node.updateOne({'sensorId': 1}, {
            'temp': data
        })

        if (document == null){
            console.log("The temperature is not updated");
        } else {
            console.log("The temperature is updated")
        }

        // Save the sensor data to the MongoDB database
        // const newSensorData = new sensor({
        //   temp: sensorData.sensorValue // Adjust the property name based on your JSON structure
        // });
        // await newSensorData.save();
        // console.log('Sensor data saved to the database:', sensorData);
    } catch (error) {
        console.error('Error parsing or saving sensor data:', error);
    }
});

app.get('/api/test', (req, res) => {
    res.send('The API is working!');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});