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
    const [title, setTitle] = useState('Danh mục sản phẩm')
    const [idClick, setIdClick] = useState("");

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

    const getListProductType = () => {
        if (idClick) {
            const productType = productCategory.filter(item => item.product_type._id === idClick)
            if (productType) {
                setTitle(productType[0]?.product_type.name);
                setProductCategory([])
                setProductCategory(productType);
            }
            console.log("productCategory", productCategory)
        }
    }

    useEffect(()=>{
        getListProductType()
    }, [idClick]) 

    return (
        <>
            <HeadProvider>
                <div>
                    <Title>Sun-flower</Title>
                    <Link rel="canonical" href="http://jeremygayed.com/" />
                    <Meta name="example" content="whatever" />
                </div>
            </HeadProvider>
            <div>
                <TopContent click={setIdClick} />
                {/* <ContentProduct /> */}
                <div style={{height:40}}/>
                <ProductCate
                    title={title}
                    listProduct={productCategory}
                />
                <DetectFlower />
            </div>
        </>
    );
}

export default Home;