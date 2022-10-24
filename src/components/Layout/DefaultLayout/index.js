import Header from '../components/Header';
import Topbar from './Topbar';

function DefaultLayout({children}){
    return(
        <div>
            <Topbar/>
            <div className='container'>
                <Header/>
                <div className='content'>{children}</div>
            </div>
        </div>
    );
}

export default DefaultLayout;