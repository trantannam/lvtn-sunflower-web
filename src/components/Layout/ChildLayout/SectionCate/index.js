import './SectionCate.css';
import {GoThreeBars} from 'react-icons/go';
import {IoMdArrowDropdown} from 'react-icons/io'

function SectionCate() {
    return (
        <div id='section-cate'>
            <div className='container'>
                <div className='wrap-cate-left'>
                    <div className='dropdown cate-menu-dropdown'>
                        <button className="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false">
                            <GoThreeBars className="icon" style={{ maxWidth: 100 }} />
                            Danh mục
                            <IoMdArrowDropdown className="caret pull-right"/>
                        </button>
                    </div>
                </div>
                <div className="wrap-cate-right">
                    <nav className="nav-extend">
                        <ul>
                            <li>
                                <a>
                                    <span>
                                        Su kien
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <span>
                                        Giao nhanh
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <span>
                                        Lan ho diep
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <span>
                                        Hoa tang
                                    </span>
                                </a>
                            </li>
                            <li>
                                <a>
                                    <span>
                                        Danh cho doanh nghiep
                                    </span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default SectionCate;