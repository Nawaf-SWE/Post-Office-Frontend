import axios from "axios";
import UIkit from "uikit";

const axiosHandler = async (method, endpoint) => {
    try {
        const response = await axios({
            baseURL: "http://localhost:5000",
            method: method,
            url: endpoint,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data;
    } catch (error) {
        // Handle errors here, e.g., show a UIKit notification
        UIkit.notification({
            message: "An error occurred: " + error.message,
            status: "danger",
        });
        // throw error; // Re-throw the error to propagate it
    }
};
export default axiosHandler;
