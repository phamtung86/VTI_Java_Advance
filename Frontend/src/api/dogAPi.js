import axios from "axios";

const getRandomDog =  (quantity) => {
    return axios.get(`https://dog.ceo/api/breeds/image/random/${quantity}`);
}
const DogApi = {
    getRandomDog
}
export default DogApi;