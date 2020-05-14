import config from './mqttConfig';
import { Alert } from 'react-native';

// var mqtt = require('@taoqf/react-native-mqtt');
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

var mqtt = require('@taoqf/react-native-mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')

// Alert.alert(client.connected.toString()) 

client.on('connect', function () {
    Alert.alert("HELLO")
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})

export default client;