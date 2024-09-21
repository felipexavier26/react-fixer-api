import axios from 'axios';

const BackEnd = axios.create({
    baseURL: 'https://data.fixer.io/api',  
    timeout: 10000,  
    params: {
        access_key: '11a2e33fe9cb95c2e0866e654edd335e'  
    }
});

export default BackEnd;
