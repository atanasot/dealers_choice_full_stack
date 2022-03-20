import React, {Component} from 'react'
import { connect } from 'react-redux'
import {createDog} from './store'

class Create extends Component {
    constructor() {
        super()
        this.state = {  //this is local state, only the state of the form
            name: ''
        }
        this.onChange = this.onChange.bind(this)
        this.onSave = this.onSave.bind(this)
    }
    // need this onChange so we can type inside the form
    onChange(ev) {
        const change = {}
        change[ev.target.name] = ev.target.value
        this.setState(change) //set the new state to the change obj
    }
    onSave(ev) {    // onSave just gets rid of default form behaviour on submit
        ev.preventDefault()
        this.props.create(this.state.name)
    }

    render() {
        const { name } = this.state
        const { onChange, onSave } = this
        return (
            <form onSubmit={ onSave }>
                <input name="name" value={ name } onChange={onChange}/>
                <button>Save</button>
            </form>
        )
    }
}

// check database for duplicate names
const mapDispatchToProps = (dispatch, {history}) => {
    return {
        create: (name) => dispatch(createDog(name, history))
    }
}

export default connect(null, mapDispatchToProps)(Create)