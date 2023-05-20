import axios from "axios";

const verifyToken = async (token) => {
    if (token) {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        }
        const { data } = await axios.get(`/users/profile`, config);
        return data;
    }
}
export default verifyToken;