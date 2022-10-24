import Header from './Header';

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