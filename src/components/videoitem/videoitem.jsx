import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from 'store/action'

import "./videoitem.scss"

class Product extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div className="videoItem">
                <div className="img"><img src={this.props.datas.image} alt=""/></div>
                <div className="text">
                    <p className="videoTitle ellipsis">{this.props.datas.title}</p>
                    <p className="author ellipsis">{this.props.datas.author}</p>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return {
        states:state.testStore
    }
}

function mapDispatchToProps (dispatch){
    return {
        handerTest:bindActionCreators(actions,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Product);