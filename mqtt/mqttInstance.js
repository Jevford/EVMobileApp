import config from './mqttConfig';

/*
    This instance should only ask for the charger state on intial startup of the app.
    For now it continually asks for the charger state as well as toggles the charger from the mobile (Which it should not do in the future)
*/

// Read up on this \/ from the npm website if you need to understand MQTT connection implementation
var mqtt = require('@taoqf/react-native-mqtt')

  export default class Client {
        constructor(){
            // evse_sim python script deviceID 
            // this.deviceID = 'evse_sim1',  <- Use this deviceID if you want to test with the python script simulator

            // Physical Charger Sim Board deviceID (The actual charger, with light bulbs and heaters)
            this.deviceID = '240AC4110540',

            // Topics to subscribe to, # mark used to subscribe to multiple topics with the same base topic
            this.topics = [
                'out/devices/' + this.deviceID + '/1/SimpleMeteringServer/#',
                'out/devices/' + this.deviceID + '/1/OnOff/#',
            ],

            this.mqttURI = config.protocal + config.host + ':' + config.port.toString() + '/',

            // Creates the initial connection to the mqtt broker (cloud mqtt Websockets UI)
            this.client = mqtt.connect(this.mqttURI, {
                clientId: this.deviceID,
                username: config.username,
                password: config.password
            })
            
            this.chargeState = 0
            this.chargerRelayState = 0

            this.connectFlag = false
            if(!this.connectFlag){
                this.connectCharger()
                this.client.publish('EVIE', 'Connection established between mobile app and mqtt broker.')
                this.requestChargeState()
            }
        }

        // Method that connects to the mqtt Broker
        connectCharger = () => {
            this.client.on('connect', () => {
                this.connectFlag = true
                this.client.subscribe(this.topics, (err) => {
                    if (!err) {
                        // this.client.publish('EVIE', 'Connection established between mobile app and mqtt broker.') <- Testing Purposes with BrokerUI
                    } else {
                        // Alert.alert("Conncetion Error: " + err.message.toString())
                        // this.connectCharger()
                    }
                })
            })
        }

        // Method that send a chargeState topic and listens for the return message from the charger
        requestChargeState = () => {
            let req = 'in/devices/' + this.deviceID + '/1/SimpleMeteringServer/ChargeState'
            let rec = 'out/devices/' + this.deviceID + '/1/SimpleMeteringServer/ChargeState'
            this.client.publish(req, '{"method": "get","params":{}}')

            this.client.on('message', (topic, message) => {
                if (topic == rec){
                    if(message == 1){ 
                        this.chargeState = 1
                    }
                    else if(message == 2){ 
                        this.chargeState = 2
                    }
                    else if(message == 3){ 
                        this.chargeState = 3
                    }
                }
            })
        }

        // Method that send toggle request to the charger to turn on
        toggleChargerOn = () => {
            let req = 'in/devices/' + this.deviceID + '/1/OnOff/On'
            let rec = 'out/devices/' + this.deviceID + '/1/OnOff/On'
            this.client.publish(req, '{"method": "post","params":{}}')

            this.client.on('message', (topic, message) => {
                if (topic == rec){
                    // Alert.alert("Toggle = Message: " + message)
                    this.chargerRelayState = 1
                } else {
                    // Alert.alert("Charge State Request Failed: " + topic)
                }
            })
            this.requestChargeState()
        }

        // Toggles the charger off
        toggleChargerOff = () => {
            let req = 'in/devices/' + this.deviceID + '/1/OnOff/Off'
            let rec = 'out/devices/' + this.deviceID + '/1/OnOff/Off'
            this.client.publish(req, '{"method": "post","params":{}}')

            this.client.on('message', (topic, message) => {
                if (topic == rec){
                    // Alert.alert("Toggle = Message: " + message)
                    this.chargerRelayState = 0
                } else {
                    // Alert.alert("Charge State Request Failed: " + topic)
                }
            })
            this.requestChargeState()
        }

  }