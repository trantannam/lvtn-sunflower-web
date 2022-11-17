import request from "../utils/request";
import { loginFailed, loginStart, loginSuccess } from "./authSlice"

export const loginUser = async (user, dispatch, navigate) => {
    dispatch(loginStart());
    try {
        const res = await request.post("/customer/login", user);
        dispatch(loginSuccess(res.data));
        navigate("/");
    } catch (error) {
        dispatch(loginFailed());
    }
}