import TopContent from "../../components/TopContent";
import ContentProduct from "../../components/ContentProduct";
import ProductCate from "../../components/ProductCate";
import { HeadProvider, Title, Link, Meta } from 'react-head';


function Home() {
    document.title = "Sun flower";

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
                <ProductCate />
            </div>
        </>
    );
}

export default Home;