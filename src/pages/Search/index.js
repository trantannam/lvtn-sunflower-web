import ProductCate from "../../components/ProductCate";
import { HeadProvider, Title, Link, Meta } from 'react-head';
import { useLocation } from "react-router-dom";

function Search() {
    document.title = "Sun flower";
    const location = useLocation();

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
                <ProductCate 
                    title={'Kết quả tìm kiếm'}
                    listProduct={location.state}
                />
            </div>
        </>
    );
}

export default Search;