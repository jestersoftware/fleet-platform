import React from 'react'
import './example-animation.css'

export default class Container extends React.Component {
  state = {
    items : []
  }

  render() {
    return (<div className='p-4'>
      <div className='mb-5'>
        <button className="btn btn-secondary mr-3"
          onClick={()=> this.setState({items : [1,2,3,4,5,6,7,8]})}
          hidden={this.state.items.length ? true : false}
        >
          click to view enter animation
        </button>
        <button className="btn btn-secondary"
          onClick={()=> this.setState({items : []})}
          hidden={this.state.items.length ? false : true}
        >view exit animation <small>(in theory lol)</small>
        </button>
      </div>
      <div>
        {React.cloneElement(this.props.children, { items: this.state.items })}
      </div>
    </div>)
  }
}
