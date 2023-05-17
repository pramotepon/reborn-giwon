import axios from "axios";

const verifyToken = async (token) => {
    if (token) {
        const { data } = await axios.get(`/users/profile/${token}`);
        return data;
    }
}
export default verifyToken;