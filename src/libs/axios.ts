import { API_TOKEN, API_URL } from "@env";
import axios from "axios";

export const ApiAxios = axios.create({
    baseURL: API_URL,
    headers: {
        Authorization: `Bearer ${API_TOKEN}`
    }
});

export const configureAxios = async () => {
    ApiAxios.defaults.withCredentials = true;
    ApiAxios.interceptors.response.use(
        (response) => response,
        () => {
            // Handle many cases such as 401 & 500
            // For me I'll just pass "Failed"
            throw new Error("Failed");
        },
    );
};

configureAxios();
