import Header from '../components/Header';
import Topbar from '../components/Topbar';

function DefaultLayout({children}){
    return(
        <div>
            <Topbar/>
            <Header/>
            <div className='container'>
                <div className='content'>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;