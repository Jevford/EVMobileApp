import axios from 'axios';

// Keep this config private as this is the direct link to the CalPlug database API
const instance = axios.create({
    // The base url must use the https protocal to allow secure connections to CalPlug's servers
    baseURL: 'https://cpmqtt1.calit2.uci.edu/'
});

export default instance;