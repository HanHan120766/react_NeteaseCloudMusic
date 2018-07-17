import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from 'store/action'

import "./player.scss"

class Player extends React.Component{
    constructor(props){
        super(props)
    }
    componentDidMount=()=>{
        document.body.style.overflowY='hidden';
    } 
    componentWillUnmount=()=>{
        document.body.style.overflowY='auto'
    }
    render(){

        return (
            <div className="playerContent">
                Player <i className="iconfont icon-next" onClick={()=>{this.props.handerty.showPlayer({showPlayer:false})}}></i>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        states:state.tyStore
    }
}

function mapDispatchToProps (dispatch){
    return {
        handerty:bindActionCreators(actions,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Player);