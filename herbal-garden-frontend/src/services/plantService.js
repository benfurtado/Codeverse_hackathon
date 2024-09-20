import axios from 'axios';

const API_URL = 'http://localhost:8000/api/plants/';

export const getPlants = () => {
    return axios.get(API_URL);
};

export const getPlantById = (id) => {
    return axios.get(`${API_URL}${id}/`);
};
