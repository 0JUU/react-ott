import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3",
    params: {
        api_key: "3b50f9fd34b84cc269cc956b2195ab67",
        language: "ko-KR",
    },
});

export default instance;