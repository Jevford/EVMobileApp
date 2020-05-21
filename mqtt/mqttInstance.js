import config from './mqttConfig';
import { Alert } from 'react-native';

// VERSION 2 REACT NATIVE MQTT PORT
var mqtt = require('@taoqf/react-native-mqtt')

  export default class Client {
        constructor(){
            this.deviceID = 'evse_sim1',
            this.topics = [
                'out/devices/' + this.deviceID + '/1/SimpleMeteringServer/#',
                'out/devices/' + this.deviceID + '/1/OnOff/#',
            ],
            this.mqttURI = config.protocal + config.host + ':' + config.port.toString() + '/',
            this.client = mqtt.connect(this.mqttURI, {
                clientId: this.deviceID,
                username: config.username,
                password: config.password
            })
            this.connectFlag = false
            if(!this.connectFlag){
                this.connectCharger()
                this.client.publish('EVIE', 'Connection established between mobile app and mqtt broker.')
            } 
        }

        connectCharger = () => {
            this.client.on('connect', () => {
                this.connectFlag = true
                this.client.subscribe(this.topics, (err) => {
                    if (!err) {
                        // this.client.publish('EVIE', 'Connection established between mobile app and mqtt broker.')
                    } else {
                        Alert.alert("Conncetion Error: " + err.message.toString())
                    }
                })
            })
        }


        requestChargeState = () => {
            let req = 'in/devices/' + this.deviceID + '/1/SimpleMeteringServer/ChargeState'
            let rec = 'out/devices/' + this.deviceID + '/1/SimpleMeteringServer/ChargeState'
            this.client.publish(req, '{"method": "get","params":{}}')

            this.client.on('message', (topic, message) => {
                if (topic == rec){
                    Alert.alert("reqChargeState = Message: " + message)
                    return message
                } else {
                    Alert.alert("Charge State Request Failed: " + topic)
                    return -1
                }
            })
            // this.client.end()
        }

        toggleCharger = () => {
            let req = 'in/devices/' + this.deviceID + '/1/OnOff/Toggle'
            let rec = 'out/devices/' + this.deviceID + '/1/OnOff/Toggle'
            this.client.publish(req, '{"method": "post","params":{}}')

            this.client.on('message', (topic, message) => {
                if (topic == rec){
                    // Alert.alert("Toggle = Message: " + message)
                } else {
                    Alert.alert("Charge State Request Failed: " + topic)
                }
            })
            // this.client.end()
        }

  }