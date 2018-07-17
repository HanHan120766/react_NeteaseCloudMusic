import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import './container.scss'
class Container extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (<ReactCSSTransitionGroup
                transitionName="examples"
                component="div"
                className='containerWarp'
                transitionAppearTimeout={100000}
                transitionEnterTimeout={100000}
                transitionLeaveTimeout={100000}>
                    <div key={location.hash} style={{position:"absolute", width: "100%",zIndex:-1}} >
                        {this.props.children}
                    </div>
                </ReactCSSTransitionGroup>)
    }
}
export default Container;