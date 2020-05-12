import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://api.calplug.club'
});

export default instance;