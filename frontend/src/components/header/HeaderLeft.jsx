import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";

const HeaderLeft = ({toggle, setToggle}) => {
    return (             <div className="header-left">
                <Link to="/" className="header-logo">
                    <strong>BLOG</strong>
                    <Icon.Pencil/>
                </Link>
                {
                    toggle ? 
                    <Icon.XLg onClick={()=> setToggle(prev => !prev)} className="header-menu"/>
                    :
                    <Icon.List onClick={()=> setToggle(prev => !prev)} className="header-menu"/>
                }
            </div> );
}
 
export default HeaderLeft;