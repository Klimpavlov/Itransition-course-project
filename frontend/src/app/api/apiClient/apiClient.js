import axios from "axios";

const apiClient = axios.create({
    // baseURL: "https://itransition-course-project-u539.onrender.com",
    baseURL: "http://localhost:3001",
    headers: {
        'Content-Type': 'application/json'
    }
});

export default apiClient;