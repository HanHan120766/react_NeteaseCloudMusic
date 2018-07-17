import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from 'store/action'

import './gdlist.scss'

import NotFound from 'components/notfound/notfound.jsx'

class GdList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            abomData:{
                name:''
            }
        }
    }
    render(){
        let styles ={
            height:'100%',
            backgroundColor:'#f0f0f0'
        }
        return (
            <div className='gdlistWarp'>
                {this.state.abomData.name?this.state.abomData.name:<NotFound style={styles} icon='static/images/noData.png'/>}
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
)(GdList);