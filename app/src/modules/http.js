import axios from 'axios';

// Alias for PROPFIND verb
axios.propfind = url => axios({url, method: 'PROPFIND'});

export default axios;
