import axios from "axios";
import { useEffect, useState } from "react";
import "./AddressPopup.css";


const AddressPopup = (props) => {
    const [division, setDivision] = useState([]);
    const [province, setProvince] = useState([]);
    const [listDistricts, setListD] = useState([]);
    const [district, setDistrict] = useState([]);
    const [listWard, setListW] = useState([]);
    const [ward, setWard] = useState([]);

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
        console.log("LD", listDistricts)
    }, [province]);
    useEffect(() => {
        setListW(district.map((item)=>item.map(item=>item.wards)));
        console.log("LW",listWard)
    }, [district]);

    const selectDistrict = (e) => {
        setDistrict(listDistricts.map((item)=>item.filter((item)=>item.codename===e)));
        console.log("district", district);
    }


    return props.show ? (
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
                    <select className="form-control">
                        <option defaultValue={"select"}>- Xã / Phường -</option>
                        {listWard.map(index=>index.map((index)=>index.map((item)=><option key={item.code} value={`${item.codename}`}>{item.name}</option>)))}
                    </select>
                </div>
                <div className="form-group">
                    <p>Địa chỉ</p>
                    <input className="form-control"></input>
                </div>
                <div className="btn-next">
                    Tiếp theo
                </div>
            </div>
        </div>
    ) : ""
}

export default AddressPopup;