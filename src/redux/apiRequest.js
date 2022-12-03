import request from "../utils/request";
import { loginFailed, loginStart, loginSuccess, logOutFailed, logOutStart, logOutSuccess } from "./authSlice"

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

export const logOut = async (dispatch,id, accessToken, navigate)=>{
    dispatch(logOutStart());
    try {
        await request.post("/customer/logout", id, {
            headers: {token: `Bearer ${accessToken}`},
        });
        dispatch(logOutSuccess());
    } catch (error) {
        dispatch(logOutFailed());
    }
}