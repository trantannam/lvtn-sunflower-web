import { apiURL } from "../../utils/callAPI";
import { FaStar, FaRegStar } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import request from "../../utils/request";


const RatingPopup = ({ name, image, show, close }) => {

    const [score, setScore] = useState("");
    const customerId = useSelector(state => state.auth.login.currentUser);
    const { id } = useParams();

    const handlePostRating = async () => {
        if (document.getElementById("ratingBox").value) {
            await request.post("/evaluate/create", {
                content: document.getElementById("ratingBox").value,
                rating: score,
                customer: customerId,
                product: id
            }).then(res => {
                close(false);
            })
        }
    }


    return show ? (
        <div>
            <div className="detect-popup">
                <div className="detect-wrap">
                    <p className="title">Đánh giá sản phẩm</p>
                    <div style={{
                        position: "absolute",
                        right: "20px",
                        top: "20px",
                        cursor: "pointer",
                        fontSize: "2rem",
                        fontWeight: "bold",
                        color: "#333"
                    }}
                        onClick={() => close(false)}
                    ><IoCloseSharp /></div>
                    <img style={{
                        width: "150px",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "20px"
                    }} src={apiURL + image} placeholder=" " />
                    <p className="title">{name}</p>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        padding: "1rem 0 2rem 0"
                    }}>
                        {score >= 1 ? <FaStar style={{ fontSize: "3rem", margin: "0 5px", color: "orange" }} onClick={() => setScore(1)} /> : <FaRegStar style={{ fontSize: "3rem", margin: "0 5px", color: "orange" }} onClick={() => setScore(1)} />}
                        {score >= 2 ? <FaStar style={{ fontSize: "3rem", margin: "0 5px", color: "orange" }} onClick={() => setScore(2)} /> : <FaRegStar style={{ fontSize: "3rem", margin: "0 5px", color: "orange" }} onClick={() => setScore(2)} />}
                        {score >= 3 ? <FaStar style={{ fontSize: "3rem", margin: "0 5px", color: "orange" }} onClick={() => setScore(3)} /> : <FaRegStar style={{ fontSize: "3rem", margin: "0 5px", color: "orange" }} onClick={() => setScore(3)} />}
                        {score >= 4 ? <FaStar style={{ fontSize: "3rem", margin: "0 5px", color: "orange" }} onClick={() => setScore(4)} /> : <FaRegStar style={{ fontSize: "3rem", margin: "0 5px", color: "orange" }} onClick={() => setScore(4)} />}
                        {score === 5 ? <FaStar style={{ fontSize: "3rem", margin: "0 5px", color: "orange" }} onClick={() => setScore(5)} /> : <FaRegStar style={{ fontSize: "3rem", margin: "0 5px", color: "orange" }} onClick={() => setScore(5)} />}
                    </div>
                    {score >= 1 && <>
                        <div className="comment-group">
                            <form>
                                <textarea
                                    id="ratingBox"
                                    style={{
                                        width: "90%",
                                        height: "8rem",
                                        margin: "0 5%",
                                        borderColor: "#333",
                                        font: "inherit",
                                        padding: "1rem 0 0 1rem",
                                        outline: "none"
                                    }}
                                    placeholder="Mời bạn nhập đánh giá tại đây..." />
                            </form>
                        </div>
                        <div style={{
                            paddingBottom: "1rem"
                        }}>
                            <button
                                className="btn"
                                style={{
                                    display: "block",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    background: "rgb(12 118 0)",
                                    width: "85%",
                                    height: "4rem",
                                    fontSize: "1.2rem",
                                    color: "white",
                                    borderRadius: "1rem",
                                    marginTop: "2rem",
                                    marginBottom: "2rem",
                                }}
                                onClick={() => handlePostRating()}
                            >Gửi đánh giá</button>
                        </div>
                    </>}
                </div>
            </div>
        </div>
    ) : ""
};

export default RatingPopup;