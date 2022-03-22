import React from "react";
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import faker from "faker"; 
import {createFakerDog} from './store'

const createRandomTypeId = () => {
    return Math.ceil(Math.random() * 6)
}

// const fakeDog = {
//     name: faker.name.firstName(),
//     typeId: createRandomTypeId()
// }
 
const Nav = ({createFaker, dogs, location: {pathname}}) => {
    return(
        <nav>
            <Link to="/" className={ pathname === '/' ? "selected" : ""}>Home</Link>  
            <Link to="/dogs" className={pathname === '/dogs' ? 'selected' : ''}>Dogs ({dogs.length})</Link> 
            <button onClick={() => createFaker(faker.name.firstName(), createRandomTypeId())}>Create faker Dog</button>
            <Link to='/dogs/create' className={pathname === '/dogs/create' ? 'selected' : ''}>Create Doggie</Link>
        </nav>
    )
};


const mapStateToProps = (state) => {
    console.log(state)
    return state
}

// getting otherProps from mapDispatchToProps to use the history object -- pass history in createFakerDog as a second arg -- we can change the url
const mapDispatchToProps = (dispatch, {history}) => {
 
    return {createFaker: (name, typeId) => dispatch(createFakerDog(name, typeId, history))} // this is how we change the url with the history obj
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)