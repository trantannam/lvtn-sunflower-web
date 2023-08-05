import "./ConfirmPopup.css";

function ConfirmPopup(props) {

    const handleClickYes=()=>{
        props.continue(true);
        props.close(false);
    }

    const handleClickNo=()=>{
        props.close(false);
    }

    return props.show ? (
        <div className="confirm-popup">
            <div className="confirm-wrap">
                <p className="title">{props.title}</p>
                <p className="content">{props.content}</p>
                <div className="confirm-btn">
                    <button className="confirm-btn btn" onClick={()=>handleClickYes()}>Xác nhận</button>
                    <button className="confirm-btn btn" onClick={()=>handleClickNo()}>Hủy</button>
                </div>
            </div>
        </div>
    ) : ""
}

export default ConfirmPopup;