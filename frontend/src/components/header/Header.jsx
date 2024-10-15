import "./header.css"
import { useState } from "react";
import HeaderLeft from "./HeaderLeft";
import  Navbar from "./Navbar";
import HeaderReght from "./HeaderReght";

const Header = () => {
    const [toggle, setToggle] = useState(false)
    return ( 
        <header className="header">
            <HeaderLeft toggle={toggle} setToggle={setToggle}/>
            <Navbar toggle={toggle } setToggle={setToggle} />
            <HeaderReght />
        </header>
     );
}
 
export default Header;