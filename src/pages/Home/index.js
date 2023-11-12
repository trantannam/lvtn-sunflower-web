import TopContent from "../../components/TopContent";
import ContentProduct from "../../components/ContentProduct";
import ProductCate from "../../components/ProductCate";
import { HeadProvider, Title, Link, Meta } from 'react-head';
import request from "../../utils/request";
import { useEffect, useState } from "react";
import DetectFlower from "../../components/DetectFlower";



function Home() {
    document.title = "Sun flower";

    //products category
    const [productCategory, setProductCategory] = useState([]);
    const [detectPopup, setDetectPopup] = useState(false);

    async function getProduct() {
        await request.get(`/product`)
            .then(function (res) {
                setProductCategory(res.data.data);
            })
            .catch((err) => {
                console.error('loi truy cap', err)
            })
    }
    useEffect(() => { getProduct(); }, [])

    return (
        <>
            <HeadProvider>
                <div>
                    <Title>Title of page</Title>
                    <Link rel="canonical" href="http://jeremygayed.com/" />
                    <Meta name="example" content="whatever" />
                </div>
            </HeadProvider>
            <div>
                <TopContent />
                <ContentProduct />
                <ProductCate
                    title={'Danh mục sản phẩm'}
                    listProduct={productCategory}
                />
                <DetectFlower/>
            </div>
        </>
    );
}

export default Home;