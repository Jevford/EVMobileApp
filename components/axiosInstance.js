import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://cpmqtt1.calit2.uci.edu/'
});

export default instance;