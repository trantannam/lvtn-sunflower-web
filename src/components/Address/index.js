import axios from "axios";
import { useEffect, useState } from "react";
import "./AddressPopup.css";
import request from '../../utils/request';
import { useSelector } from "react-redux";
import { NotificationContainer, NotificationManager } from "react-notifications";

const AddressPopup = (props) => {

    const [division, setDivision] = useState([]);
    const [province, setProvince] = useState([]);
    const [listDistricts, setListD] = useState([]);
    const [district, setDistrict] = useState([]);
    const [listWard, setListW] = useState([]);
    const [ward, setWard] = useState([]);
    const [describe, setDescribe] = useState("");
    const user = useSelector((state) => state.auth.login.currentUser);

    // https://provinces.open-api.vn/api/ depth==2
    const getAddress = () => {
        axios.get("https://provinces.open-api.vn/api/?depth=3")
            .then(res => {
                setDivision(res.data);
                // console.log("division", division);
            })
    }

    const selectProvince = (e) => {
        setProvince(division.filter(item => item.codename === e));
        console.log("province", province)
    }

    useEffect(() => {
        getAddress();
    }, []);
    useEffect(() => {
        setListD(province.map((item) => item.districts));
    }, [province]);
    useEffect(() => {
        setListW(district.map((item) => item.map(item => item.wards)));
    }, [district]);

    const selectDistrict = (e) => {
        setDistrict(listDistricts.map((item) => item.filter((item) => item.codename === e)));
    }

    const selectWard = (e) => {
        setWard(listWard.map((item) => item.map((item) => item.filter((item) => item.codename === e))));
    }

    const addAddress = () => {
        try {
            request.post("/delivery/addAddress", {
                customerID: user._id,
                division: {
                    province: province[0].name,
                    district: district[0][0].name,
                    ward: ward[0][0][0].name,
                    describe: describe,
                    type: "nha rieng"
                }
            })
                .then(
                    res => {
                        console.log("res", res)
                        if (res.data.success === true) {
                            props.close(false);
                            NotificationManager.success("Thêm địa chỉ mới thành công");
                        }
                    }
                )
        } catch (error) {
            NotificationManager.error("Có lỗi trong quá trình thêm địa chỉ!", "Lỗi", 5000);
        }
    }

    return props.show ? (
        <>
            <div className="popup">
                <div className="popup-dialog">
                    <div className="header">
                        <button onClick={() => props.close(false)} className="close" type="button">x</button>
                        <h4>Nhập địa chỉ giao hàng</h4>
                    </div>
                    <div className="form-group">
                        <p>Chọn tỉnh</p>
                        <select
                            className="form-control"
                            onChange={e => selectProvince(e.target.value)}>
                            <option defaultValue={"select"}>- Tỉnh / Thành Phố -</option>
                            {division && division.map((index) =>
                                <option key={index.code} value={`${index.codename}`}>{index.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <p>Chọn huyện</p>
                        <select
                            className="form-control"
                            onChange={(item) => selectDistrict(item.target.value)}
                        >
                            <option defaultValue={"select"}>- Huyện / Quận -</option>
                            {listDistricts.map(index => index.map((item) =>
                                <option
                                    key={item.code}
                                    value={`${item.codename}`
                                    }>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <p>Chọn xã</p>
                        <select
                            className="form-control"
                            onChange={(item) => selectWard(item.target.value)}
                        >
                            <option defaultValue={"select"}>- Xã / Phường -</option>
                            {listWard.map(index => index.map((index) => index.map((item) =>
                                <option key={item.code} value={`${item.codename}`}>
                                    {item.name}
                                </option>
                            )))}
                        </select>
                    </div>
                    <div className="form-group">
                        <p>Địa chỉ</p>
                        <input className="form-control" onChange={(e) => setDescribe(e.target.value)}></input>
                    </div>
                    <div
                        className="btn-next"
                        onClick={() => addAddress()}>
                        Thêm địa chỉ
                    </div>
                </div>
            </div>
            <NotificationContainer />
        </>
    ) : ""
}

export default AddressPopup;