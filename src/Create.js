import React, {Component} from 'react'

class Create extends Component {
    constructor() {
        super()
        this.state = {  //this is local state, only the state of the form
            name: ''
        }
        this.onChange = this.onChange.bind(this)
    }
    // need this onChange so we can type inside the form
    onChange(ev) {
        const change = {}
        change[ev.target.name] = ev.target.value
        this.setState(change) //set the new state to the change obj
    }

    render() {
        const { name } = this.state
        const { onChange } = this
        return (
            <form>
                <input name="name" value={ name } onChange={onChange}/>
                <button>Save</button>
            </form>
        )
    }
}

export default Create