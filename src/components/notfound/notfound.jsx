import React from 'react'
import './notfound'
class NotFound extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        var icon = this.props.icon;
        console.log(icon)
        return (<div className="notFound flex-hv-center" style={this.props.style}>
                    <div className="notfoundContent">
                        <img src={require('static/images/noData.png')} alt=""/>
                        <div className="txt">{this.props.text?this.props.text:'没有相关数据～'}</div>
                    </div>
                </div>)
    }
}
export default NotFound;