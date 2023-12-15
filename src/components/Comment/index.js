import request from "../../utils/request";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./Comment.css";
import { useParams } from "react-router-dom";
import countTime from "../CountTime";


function Comment() {
    const [listComment, setListComment] = useState([]);
    const customerId = useSelector(state => state.auth.login.currentUser);
    const [comment, setComment] = useState("");

    const postComment = async (e) => {
        e.preventDefault();
        request.post("/comment/postcomment", {
            content: document.getElementById("contentbox").value,
            product: window.location.pathname.split("/")[2],
            customer: customerId
        })
            .then(res => {
                setComment(res.data.comment);
                document.getElementById("contentbox").value="";
            })
    }
    const { id } = useParams();

    useEffect(() => {
        request.get(`/comment/${id}`)
            .then(res => {
                if (res.data.success) {
                    setListComment(res.data.allComment);
                }
            })
    }, [comment]);

    return (
        <div className="comment-product">
            <h2>Bình Luận</h2>
            <div className="comment-group">
                <form>
                    {/* <input className="content"></input> */}
                    <textarea id="contentbox" className="content" placeholder="Mời bạn nhập bình luận tại đây..."></textarea>
                    <div className="button-group">
                        <button className="send" onClick={(e) => postComment(e)}>Gửi</button>
                    </div>
                </form>
            </div>
            {listComment && listComment.map((com, index) =>
                <div key={index} className="comments">
                    <div className="header-comment">
                        <h3 className="ava-customer">{com.customer?.customer_name?.split(" ").pop().charAt(0)}</h3>
                        <strong className="cus-name">{com.customer?.customer_name}</strong>
                    </div>
                    <div className="content-comment"><p>{com.content}</p></div>
                    <div className="reply">
                        <button className="btn-reply">Trả lời</button>
                        <p className="reply-time">- {countTime(com.createdAt)}</p>
                    </div>
                </div>)}
        </div>
    )
}

export default Comment;