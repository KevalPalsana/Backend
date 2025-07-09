import mqtt from 'mqtt';

// Connect without username/password using WebSocket protocol
const mqttClient = mqtt.connect('wss://test.mosquitto.org:8081');

mqttClient.on('connect', () => {
    console.log('MQTT Connected to test.mosquitto.org without username/password');
    
    // Example subscription
    mqttClient.subscribe('company/notifications', (err) => {
        if (!err) console.log('Subscribed to topic');
    });
});

// Receiving notification
mqttClient.on('message', (topic, message) => {
    console.log('Received Message:', topic, message.toString());
});

// Example publish
// mqttClient.publish('company/notifications', JSON.stringify({ message: 'Hello MQTT' }));
export default mqttClient;
