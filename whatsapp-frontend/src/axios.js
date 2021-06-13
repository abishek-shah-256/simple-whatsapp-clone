import axios from 'axios';

const instance = axios.create({
    baseURL:'https://whatsapp-simple-mern.herokuapp.com',
});

export default instance;



// hosting url : https://whatsapp-login-c6e5a.web.app