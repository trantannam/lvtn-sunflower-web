import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import request from "../../utils/request";
import countTime from "../CountTime";
import StarRating from "./star";
import { FaStar } from "react-icons/fa";
import RatingPopup from "./ratingPopup";


const RatingBox = () => {
    const [stars, setStar] = useState("");
    const [reviews, setReviews] = useState("");
    const [ratings, setRatings] = useState([]);
    const { id } = useParams();
    const [step, setStep] = useState([
        { core: 1, rate: "" },
        { core: 2, rate: "" },
        { core: 3, rate: "" },
        { core: 4, rate: "" },
        { core: 5, rate: "" },
    ]);
    const [popupShow, setPopupShow] = useState(false);
    useEffect(() => {
        const getRating = async () => {
            await request.get(`/evaluate/product/${id}`)
                .then(res => {
                    var m = 0;
                    res.data.rating.map(item => m += item.rating)
                    if (res.data.rating) {
                        setStar(m / res.data.rating.length);
                        setReviews(res.data.rating.length);
                        setRatings(res.data.rating);
                        console.log("rating", ratings)
                    }
                })
        }
        getRating()
    }, [popupShow])

    useEffect(() => {
        const Core = step.map((item, index) => {
            if (item?.core === index + 1) {
                return {
                    ...item, rate: ratings.filter(elem => elem?.rating === item?.core).length
                };
            } else return item;
        })
        setStep(Core);
        console.log(Core);
    }, [ratings])
    return (
        <>
            {ratings && <RatingPopup
                name={ratings[0]?.product?.product_name}
                image={ratings[0]?.product?.image[0]}
                show={popupShow}
                close={setPopupShow}
            />}
            <div className="comment-product">
                <h2>Đánh giá {ratings[0]?.product.product_name}</h2>
                {ratings.length === 0 
                    ? <p>Mời bạn viết đánh giá</p>
                    : <div>
                        <StarRating stars={stars} reviews={reviews} size={"2rem"} />
                        {step.map((item, index) => (
                            <div key={index} style={{ display: "flex", marginTop: 20 }}>
                                <p>{item.core}</p>
                                <FaStar style={{ paddingRight: 5 }} />
                                <div style={{
                                    backgroundColor: "#eee",
                                    borderRadius: "20px",
                                    height: " 6px",
                                    position: "relative",
                                    width: "300px",
                                    marginTop: 6
                                }}>
                                    <p style={{
                                        backgroundColor: "#ff9f00",
                                        borderRadius: "20px",
                                        left: 0,
                                        height: "6px",
                                        position: "absolute",
                                        top: 0,
                                        width: `${(item.rate * 100 / reviews)}%`
                                    }} />
                                </div>
                                <p>{Math.floor((item.rate * 100 / reviews)) + "%"}</p>
                                {/* {`${(item?.rate / reviews)* 100}%`} */}
                            </div>))}
                    </div>
                }
                {ratings && ratings.map((rating, index) => (
                    <div key={index} className="comments">
                        <div className="header-comment">
                            <h3 className="ava-customer">{rating?.customer?.customer_name.split(" ").pop().charAt(0)}</h3>
                            <strong className="cus-name">{rating?.customer?.customer_name}</strong>
                        </div>
                        <StarRating stars={rating.rating} size={16} />
                        <div className="content-comment"><p>{rating.content}</p></div>
                        <div className="reply">
                            <p className="reply-time">{countTime(rating.createdAt)}</p>
                        </div>
                    </div>
                ))}
                <button
                    className="btn"
                    style={{
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        background: "rgb(12 118 0)",
                        width: '19rem',
                        height: "4rem",
                        fontSize: "1.3rem",
                        color: "white",
                        borderRadius: "1rem",
                        marginTop: "2rem"
                    }}
                    onClick={() => setPopupShow(true)}
                >Đánh giá</button>

            </div>
        </>
    )
}

export default RatingBox;