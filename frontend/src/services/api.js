import axios from 'axios';

const API_URL = 'https://visualdasborad-backend.onrender.com';

export const fetchData = async (filters = {}) => {
    const { data } = await axios.get(API_URL, { params: filters });
    return data;
};

export const fetchKpis = async (filters = {}) => {
    const { data } = await axios.get(`${API_URL}/kpis`, { params: filters });
    return data;
};

export const fetchAnalytics = async (filters = {}) => {
    const { data } = await axios.get(`${API_URL}/analytics`, { params: filters });
    return data;
};

export const fetchFilters = async () => {
    const { data } = await axios.get(`${API_URL}/filters`);
    return data;
};
