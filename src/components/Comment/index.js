import request from "../../utils/request";
import { useEffect, useState } from "react";
import { useSelector} from "react-redux";
import "./Comment.css";


function Comment() {

    const [listComment, setListComment] = useState([]);
    const customerId = useSelector(state => state.auth.login.currentUser);
    

    const postComment = async (e) => {

        e.preventDefault();
        // await setContent($('textarea#content').val());
        // console.log("content",content)
            await request.post("/comment/postcomment", {
                content: document.getElementById("contentbox").value,
                product: window.location.pathname.split("/")[2],
                customer: customerId
            })
            .then(res=>{
                console.log("res", res);
            })
        
    }

    const getComment = async () => {
        await request.get(`/comment/${window.location.pathname.split("/")[2]}`)
            .then(res => {
                if (res.data.success) {
                    setListComment(res.data.allComment);
                }
            })
            getComment();
    }

    useEffect(() => {
        getComment()
    }, []);


    return (
        <div className="comment-product">
            <h2>Bình Luận</h2>
            <div className="comment-group">
                <form>
                    {/* <input className="content"></input> */}
                    <textarea id="contentbox" className="content" placeholder="Mời bạn nhập bình luận tại đây..."></textarea>
                    <div className="button-group">
                        <button className="send" onClick={(e)=>postComment(e) }>Gửi</button>
                    </div>
                </form>
            </div>
            {listComment && listComment.map((com, index) =>
                <div key={index} className="comments">
                    <div className="header-comment">
                        <h3 className="ava-customer">{com.customer.customername.split(" ").pop().charAt(0)}</h3>
                        <strong className="cus-name">{com.customer.customername}</strong>
                    </div>
                    <div className="content-comment"><p>{com.content}</p></div>
                    <div className="reply">
                        <button className="btn-reply">Trả lời</button>
                        <p className="reply-time">- 10 tiếng trước</p>
                    </div>
                </div>)}
        </div>
    )
}

export default Comment;