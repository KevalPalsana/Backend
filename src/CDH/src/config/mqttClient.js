// import mqtt from "mqtt";
// import dotenv from "dotenv";

// dotenv.config();

// const MQTT_BROKER_URL = process.env.MQTT_BROKER_URL;
// const client = mqtt.connect(MQTT_BROKER_URL);


// client.on("connect", () => console.log("MQTT Connected!"));
// client.on("error", (err) => console.error("MQTT Connection Error:", err));

// const sendMQTTNotification = (topic,message) => {
//   client.publish(topic, JSON.stringify({ message }))
// };

// export  {client, sendMQTTNotification};