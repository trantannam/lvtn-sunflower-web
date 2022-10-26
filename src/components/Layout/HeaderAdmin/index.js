import Header from "../components/Header";


function HeaderAdmin({children}){
    return(
        <div>
            <div className='container'>
                <Header/>
                <div className='content'>{children}</div>
            </div>
        </div>
    );
}

export default HeaderAdmin;