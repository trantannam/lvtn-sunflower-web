import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import styled from "styled-components";

const StarRating = ({ stars, reviews, size }) => {
    const ratingStar = Array.from({ length: 5 }, (elem, index) => {
        let number = index + 0.5;

        return (
            <span key={index}>
                {stars >= index + 1 ? (
                    <FaStar style={{fontSize:size}} className="star-icon" />
                ) : stars >= number ? (
                    <FaStarHalfAlt style={{fontSize:size}} className="star-icon" />
                ) : (<FaRegStar style={{fontSize:size}} className="star-icon" />)}
            </span>
        )
    })

    return (
        <Wrapper>
            <div className="icon-style">
                {ratingStar}
                <p>{reviews ? `${reviews} đánh giá`:""}</p>
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.section`
    .icon-style{
        display:flex;
        gap:0.2rem;
        align-items:center;
        justify-content:flex-start;
        padding-top:14px;

        .star-icon{
            color:orange;
        }

        .empty-icon{
            font-size:2.6rem;
        }

        p{
            margin:0;
            padding-left:1.2rem;
        }
    }
`

export default StarRating;