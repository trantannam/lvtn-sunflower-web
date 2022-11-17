import Header from '../components/Header';
import Topbar from '../components/Topbar';
import SectionCate from './SectionCate';


function ChildLayout({children}){
    return(
        <div>
            <Topbar/>
            <div className='container'>
                <Header/>
                <SectionCate/>
                <div className='content'>{children}</div>
            </div>
        </div>
    );
}

export default ChildLayout;