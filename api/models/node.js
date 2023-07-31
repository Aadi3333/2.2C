const mongoose = require('mongoose');

module.exports = mongoose.model('NodeData', new mongoose.Schema({
    sensorId: Number,
    temp: Number,
}, { collection: 'nodeData' }));

