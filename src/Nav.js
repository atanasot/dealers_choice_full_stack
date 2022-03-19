import React from "react";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Nav = ({dogs, location: {pathname}}) => {
    return(
        <nav>
            <Link to="/" className={ pathname === '/' ? "selected" : ""}>Home</Link>  
            <Link to="/dogs" className={pathname === '/dogs' ? 'selected' : ''}>Dogs ({dogs.length})</Link> 
        </nav>
    )
};

export default connect(state => state)(Nav)