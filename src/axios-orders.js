//Axios Imports
import axios from 'axios';

//Create the Axios-Orders Instance
const instance = axios.create({
    baseURL: 'https://react-burger-builder-de78d.firebaseio.com/',
}); export default instance;