import config from './mqttConfig';
import { Alert } from 'react-native';

// VERSION 1 MQTT PORT
// var mqtt = require('mqtt');
// var client = mqtt.connect(config.protocal + config.host + config.port, {
//     username: config.username,
//     password: config.password
// });

// var client = mqtt.connect('tcp://m10.cloudmqtt.com:17934', {
//     clientId: 'evsesim_1',
//     username: 'dkpljrty',
//     password: "ZJDsxMVKRjoR", 
// });

// var client = mqtt.connect('mqtt://test.mosquitto.org');

// Alert.alert(client.connected.toString())

// client.on('error', ( err ) => {
//     Alert.alert(err.toString())
// });

// client.on('connect', ( connack ) => {
//     Alert.alert(connack.rc.toString())
//     client.subscribe('presence', function (err) {
//       if (!err) {
//         client.publish('presence', 'Hello mqtt')
//       }
//     }) 
// });
   
// client.on('message', function (topic, message) {
//     // message is Buffer
//     Alert.alert(message.toString())
//     client.end()
// });


// VERSION 2 REACT NATIVE MQTT PORT
// var mqtt = require('@taoqf/react-native-mqtt')
// var client  = mqtt.connect('mqtt://test.mosquitto.org')

// // Alert.alert(client.connected.toString()) 

// client.on('connect', function () {
//     Alert.alert("HELLO")
//   client.subscribe('presence', function (err) {
//     if (!err) {
//       client.publish('presence', 'Hello mqtt')
//     }
//   })
// })

// client.on('message', function (topic, message) {
//   // message is Buffer
//   Alert.alert(message.toString())
//   client.end()
// })

// VERSION 3 PAHO MQTT
import { Client, Message } from 'react-native-paho-mqtt';
 
//Set up an in-memory alternative to global localStorage
const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },
  getItem: (key) => myStorage[key],
  removeItem: (key) => {
    delete myStorage[key];
  },
};
 
// Create a client instance
const client = new Client({ uri: 'ws://iot.eclipse.org:80/ws', clientId: 'clientId', storage: myStorage });
// const client = new Client({ uri: "ws://m10.cloudmqtt.com:17934/", clientId: 'clientId', storage: myStorage });  Only Accepts WS protocol
 
client.on('messageReceived', (message) => {
  Alert.alert(message.payloadString);
});
 
// connect the client
// client.connect({ username: 'dkpljrty',password: "ZJDsxMVKRjoR", mqttVersion: 4, mqttVersionExplicit: true })
client.connect()
  .then(() => {
    // Once a connection has been made, make a subscription and send a message.
    Alert.alert('onConnect');
    return client.subscribe('World');
  })
  .then(() => {
    const message = new Message('Hello');
    message.destinationName = 'World';
    client.send(message);
  })
  .catch((responseObject) => {
    if (responseObject.errorCode !== 0) {
      // Alert.alert('onConnectionLost:' + responseObject.errorMessage);
      Alert.alert('onConnectionLost: ' + responseObject.errorCode);
    }
  });

// set event handlers
client.on('connectionLost', (responseObject) => {
  if (responseObject.errorCode !== 0) {
    // Alert.alert(responseObject.errorMessage);
    Alert.alert("Hello");
  }
});


export default client;