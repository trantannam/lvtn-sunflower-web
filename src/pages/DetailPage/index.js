import Comment from "../../components/Comment";
import DetailProduct from "../../components/DetailProduct";
import RatingBox from "../../components/Rating/ratingBox";


function DetailPage() {
    return (
        <div>
            <DetailProduct />
            <RatingBox/>
            <Comment />
        </div>
    );
}

export default DetailPage;