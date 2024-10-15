import * as Icon from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ toggle, setToggle }) => {
      const { user } = useSelector((state) => state.auth);
    return ( 
            <nav style={{ clipPath: toggle && "polygon(0 0, 100% 0%, 100% 100%, 0% 100%)"}} className="navbar">
                <ul className="nav-links">
                    <Link to="/" className="nav-link" onClick={()=> setToggle( false)}> 
                        <Icon.House className="icon" />Home
                    </Link>
                    
                    <Link to="/posts" className="nav-link" onClick={() => setToggle(false)}>
                        <Icon.Stickies className="icon"/>Posts
                    </Link>
                {
                    user && (
                        <Link to="/posts/create-post" className="nav-link" onClick={()=> setToggle(false)}>
                            <Icon.JournalPlus className="icon"/>Create
                        </Link>
                    )
                }
                {
                    user?.isAdmin && (
                    <Link to="/admin-dashboard" className="nav-link" onClick={()=> setToggle(false)}>
                        <Icon.PersonCheck className="icon"/>Admin Dashboard
                    </Link>
                        
                    )
                }
                </ul>
            </nav>
     );
}
 
export default Navbar;
