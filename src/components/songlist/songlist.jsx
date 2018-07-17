
import React from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import * as actions from 'store/action'

import './songlist.scss'
import $ from 'jquery'

import NotFound from 'components/notfound/notfound.jsx';
class SongList extends React.Component{
    constructor(props){
        super(props)
        this.state={
            DQlist:[],
            GSlist:[],
            ZJlist:[],
            GDlist:[],
            SPlist:[],
            ZBDTlist:[],
            YHlist:[],
            limit:30
        }
    }
    getSearchDatas(params){
        var _this=this
        return new Promise((resolve, reject)=>{
                wyx.ajax({
                    url:'/search',
                    data:{...params.data,keywords:_this.props.keyword},
                    dataType:'json',
                    success(res){
                        resolve(res);
                    },
                    error(err){
                        reject(err)
                    }
                })
        });
    }

    componentWillMount=()=>{
        switch (this.props.slideBlock){
            case 'DQlist':
                this.compileDQ()
            break;
            case 'GSlist':
                this.compileGS()
            break;
            case 'ZJlist':
                this.compileZJ()
            break;
            case 'GDlist':
                this.compileGD()
            break;
            case 'SPlist':
                this.compileSP()
            break;
            case 'ZBDTlist':
                this.compileZBDT()
            break;
            case 'YHlist':
                this.compileYH()
            break;
            default:return;
        }
    }

    componentDidMount=()=>{ 
        this.drapLoad()
    }
    drapLoad=()=>{
        var _this = this,
            doms = `.dqListWarp-${this.props.slideBlock}`,
            limit=_this.state.limit,
            DQoffset=0,GSoffset=0,ZJoffset=0,GDoffset=0,SPoffset=0,ZBDToffset=0,YHoffset=0;
            this.DQlistHasmore=true;
            this.GSlistHasmore=true;
            this.ZJlistHasmore=true;
            this.GDlistHasmore=true;
            this.SPlistHasmore=true;
            this.ZBDTlistHasmore=true;
            this.YHlistHasmore=true;
        //上拉加载更多
        $(doms).parent().on('scroll',function(){
            var top = $(this).scrollTop()
            var winh = $(this).outerHeight()
            var doch = $(doms).outerHeight()
            if(doch-top-winh<=10){
                switch (_this.props.slideBlock){
                    case 'DQlist':
                        if(!this['DQlist']){
                            this['DQlist']=true
                            DQoffset+=limit
                            if(_this.DQlistHasmore){
                                _this.getSearchDatas({data:{type:1,limit,offset:DQoffset},type:'DQlist'}).then((res)=>{
                                    this['DQlist']=false
                                    var DQlist=[..._this.state.DQlist,...res.result.songs]
                                    res.result.songs.length<limit && (_this.DQlistHasmore=false)
                                    _this.setState({
                                        DQlist
                                    })
                                })
                            }
                        }
                    break;
                    case 'GSlist':
                        if(!this['GSlist']){
                            this['GSlist']=true
                            GSoffset+=limit
                            if(_this.GSlistHasmore){
                                _this.getSearchDatas({data:{type:100,limit,offset:GSoffset},type:'GSlist'}).then((res)=>{
                                    this['GSlist']=false
                                    var GSlist=[..._this.state.GSlist,...res.result.artists]
                                    res.result.artists.length<limit && (_this.GSlistHasmore=false)
                                    _this.setState({
                                        GSlist
                                    })
                                })
                            }
                        }
                    break;
                    case 'ZJlist':
                        if(!this['ZJlist']){
                            this['ZJlist']=true
                            ZJoffset+=limit
                            if(_this.ZJlistHasmore){
                                _this.getSearchDatas({data:{type:10,limit,offset:ZJoffset},type:'ZJlist'}).then((res)=>{
                                    this['ZJlist']=false
                                    var ZJlist=[..._this.state.ZJlist,...res.result.albums]
                                    res.result.albums.length<limit && (_this.ZJlistHasmore=false)
                                    _this.setState({
                                        ZJlist
                                    })
                                })
                            }
                        } 
                    break;
                    case 'GDlist':
                        if(!this['GDlist']){
                            this['GDlist']=true
                            GDoffset+=limit
                            if(_this.GDlistHasmore){
                                _this.getSearchDatas({data:{type:1000,limit,offset:GDoffset},type:'GDlist'}).then((res)=>{
                                    this['GDlist']=false
                                    var GDlist=[..._this.state.GDlist,...res.result.playlists]
                                    res.result.playlists.length<limit && (_this.GDlistHasmore=false)
                                    _this.setState({
                                        GDlist
                                    })
                                })
                            }
                        }
                    break;
                    case 'SPlist':
                        if(!this['SPlist']){
                            this['SPlist']=true
                            SPoffset+=limit
                            if(_this.SPlistHasmore){
                                _this.getSearchDatas({data:{type:1004,limit,offset:SPoffset},type:'SPlist'}).then((res)=>{
                                    this['SPlist']=false
                                    var SPlist=[..._this.state.SPlist,...res.result.mvs]
                                    res.result.mvs.length<limit && (_this.SPlistHasmore=false)
                                    _this.setState({
                                        SPlist
                                    })
                                })
                            }
                        }
                    break;
                    case 'ZBDTlist':
                        if(!this['ZBDTlist']){
                            this['ZBDTlist']=true
                            ZBDToffset+=limit
                            if(_this.ZBDTlistHasmore){
                                _this.getSearchDatas({data:{type:1009,limit,offset:ZBDToffset},type:'ZBDTlist'}).then((res)=>{
                                    this['ZBDTlist']=false
                                    var ZBDTlist=[..._this.state.ZBDTlist,...res.result.djRadios]
                                    res.result.djRadios.length<limit && (_this.ZBDTlistHasmore=false)
                                    _this.setState({
                                        ZBDTlist
                                    })
                                })
                            }
                        }
                    break;
                    case 'YHlist':
                        if(!this['YHlist']){
                            this['YHlist']=true
                            YHoffset+=limit
                            if(_this.YHlistHasmore){
                                _this.getSearchDatas({data:{type:1002,limit,offset:YHoffset},type:'YHlist'}).then((res)=>{
                                    this['YHlist']=false
                                    var YHlist=[..._this.state.YHlist,...res.result.userprofiles]
                                    res.result.userprofiles.length<limit && (_this.YHlistHasmore=false)
                                    _this.setState({
                                        YHlist
                                    })
                                })
                            }
                        }
                    break;
                    default:return;
                }
            }
            
        })
    }

    compileDQ=()=>{
        this.getSearchDatas({data:{type:1},type:'DQlist'}).then((res)=>{
            if(res.result.artistsCount<=this.state.limit){
                this.DQlistHasmore=false
            }
            this.setState({
                DQlist:res.result.songs || []
            })
        })
        
    }
    compileGS=()=>{
        this.getSearchDatas({data:{type:100},type:'GSlist'}).then((res)=>{
            if(res.result.artistCount<=this.state.limit){
                this.GSlistHasmore=false
            }
            this.setState({
                GSlist:res.result.artists || []
            })
        })
    }
    compileZJ=()=>{
        this.getSearchDatas({data:{type:10},type:'ZJlist'}).then((res)=>{
            if(res.result.albumsCount<=this.state.limit){
                this.ZJlistHasmore=false
            }
            this.setState({
                ZJlist:res.result.albums || []
            })
        })
    }
    compileGD=()=>{
        this.getSearchDatas({data:{type:1000},type:'GDlist'}).then((res)=>{
            if(res.result.playlistsCount<=this.state.limit){
                this.GDlistHasmore=false
            }
            this.setState({
                GDlist:res.result.playlists || []
            })
        })
    }
    compileSP=()=>{
        this.getSearchDatas({data:{type:1004},type:'SPlist'}).then((res)=>{
            if(res.result.mvsCount<=this.state.limit){
                this.SPlistHasmore=false
            }
            this.setState({
                SPlist:res.result.mvs || []
            })
        })
    }
    compileZBDT=()=>{
        this.getSearchDatas({data:{type:1009},type:'ZBDTlist'}).then((res)=>{
            if(res.result.djRadiosCount<=this.state.limit){
                this.ZBDTlistHasmore=false
            }
            this.setState({
                ZBDTlist:res.result.djRadios || []
            })
        })
    }
    compileYH=()=>{
        this.getSearchDatas({data:{type:1002},type:'YHlist'}).then((res)=>{
            if(res.result.userprofilesCount<=this.state.limit){
                this.YHlistHasmore=false
            }
            this.setState({
                YHlist:res.result.userprofiles || []
            })
        })
    }

    render(){
        let itemDom='';

        switch(this.props.slideBlock){
            case 'DQlist':
                if(this.state.DQlist && this.state.DQlist.length){
                    itemDom=this.state.DQlist.map((el,index)=>{
                        return (
                            <li className="DQlist item flex-warp flex-between flex-middle" key={index} onClick={()=>{this.props.handerTy.selectSong(el)}}>
                                <div className="left">
                                    <p className="name ellipsis">{el.name}</p>
                                    <p className="sqs ellipsis">{el.album.name}</p>
                                    <p className="desc ellipsis">{el.alias.map((el)=>{return el})}</p>
                                </div>
                                <div className="right flex-con flex-middle flex-warp flex-between">
                                    <i className={`iconfont ${el.mvid?'icon-shipin':''}`}></i>
                                    <i className="iconfont icon-more"></i>
                                </div>
                            </li>
                        )
                    })
                    var loadStr = <div key={this.state.DQlist.length} className='bottomLoading'>
                    {this.DQlistHasmore?(<p className="flex-hv-center"><span>加载中</span></p>):'没有更多'}
                    </div>
                    this.state.DQlist.length>15 && itemDom.push(loadStr)
                    
                }else{
                    let styles ={
                        height:'100%',
                        backgroundColor:'#f0f0f0',
                        height:'5.2rem'
                    }
                    itemDom=<NotFound style={styles} icon='static/images/noData.png'/>
                }
            break;
            case 'GSlist':
            // console.log(this.state.GSlist)
            if(this.state.DQlist && this.state.GSlist.length){
                itemDom=this.state.GSlist.map((el,index)=>{
                    return (
                        <li className="GSlist item flex-warp flex-between flex-middle" key={index}>
                            <div className="coverImg"><img src={el.img1v1Url?el.img1v1Url:el.picUrl} alt=""/></div>
                            <div className="sinerName flex-con flex-warp flex-middle">
                                <div className="ellipsis">
                                    {el.name} {
                                        el.alias.length? <span className="alia" >({el.alias[0]})</span>:''
                                    }
                                </div>
                            </div>
                        </li>
                    )
                })
                var loadStr = <div key={this.state.GSlist.length} className='bottomLoading'>
                {this. GSlistHasmore?(<p className="flex-hv-center"><span>加载中</span></p>):'没有更多'}
                </div>
                this.state.GSlist.length>15 && itemDom.push(loadStr)
            }else{
                let styles ={
                    height:'100%',
                    backgroundColor:'#f0f0f0',
                    height:'5.2rem'
                }
                itemDom=<NotFound style={styles} icon='static/images/noData.png'/>
            }
            break;
            case 'ZJlist':
            if(this.state.ZJlist && this.state.ZJlist.length ){
                itemDom=this.state.ZJlist.map((el,index)=>{
                    return (
                        <li className="ZJlist item flex-warp flex-between flex-middle" key={index}>
                            <div className="coverImg"><img src={el.img1v1Url?el.img1v1Url:el.picUrl} alt=""/></div>
                            <div className="sinerName flex-con flex-warp flex-middle">
                                <div className="txtWarp">
                                    <div className="ellipsis">
                                        {el.name} {
                                            el.alias.length? <span className="alia" >({el.alias[0]})</span>:''
                                        }
                                    </div>
                                    <div className="author ellipsis">{el.artist.name}
                                        <span className="time">{new Date(el.publishTime).format('yyyy-MM-dd')}</span> 
                                    </div>
                                </div>
                                
                            </div>
                        </li>
                    )
                })
                var loadStr = <div key={this.state.ZJlist.length} className='bottomLoading'>
                {this. ZJlistHasmore?(<p className="flex-hv-center"><span>加载中</span></p>):'没有更多'}
                </div>
                this.state.ZJlist.length>15 && itemDom.push(loadStr)
                
            }else{
                let styles ={
                    height:'100%',
                    backgroundColor:'#f0f0f0',
                    height:'5.2rem'
                }
                itemDom=<NotFound style={styles} icon='static/images/noData.png'/>
            }
            break;
            case 'GDlist':
            if(this.state.GDlist && this.state.GDlist.length){
                itemDom=this.state.GDlist.map((el,index)=>{
                    return (
                        <li className="GDlist item flex-warp flex-between flex-middle" key={index}>
                            <div className="coverImg"><img src={el.coverImgUrl} alt=""/></div>
                            <div className="sinerName flex-con flex-warp flex-middle">
                                <div className="txtWarp">
                                    <div className="ellipsis">
                                        {el.name}
                                    </div>
                                    <div className="author ellipsis">
                                        {el.trackCount}首音乐  by {el.creator.nickname}， 播放{el.playCount}次
                                    </div>
                                </div>
                                
                            </div>
                        </li>
                    )
                })
                var loadStr = <div key={this.state.GDlist.length} className='bottomLoading'>
                {this. GDlistHasmore?(<p className="flex-hv-center"><span>加载中</span></p>):'没有更多'}
                </div>
                this.state.GDlist.length>15 && itemDom.push(loadStr)
            }else{
                let styles ={
                    height:'100%',
                    backgroundColor:'#f0f0f0',
                    height:'5.2rem'
                }
                itemDom=<NotFound style={styles} icon='static/images/noData.png'/>
            }
            break;
            case 'SPlist':
            if(this.state.SPlist && this.state.SPlist.length){
                itemDom=this.state.SPlist.map((el,index)=>{
                    return (
                        <li className="SPlist item flex-warp flex-between flex-middle" key={index}>
                            <div className="coverImg"><img src={el.cover} alt=""/></div>
                            <div className="sinerName flex-con flex-warp flex-middle">
                                <div className="txtWarp">
                                    <div className="ellipsis">
                                        {el.name}
                                    </div>
                                    <div className="author ellipsis">
                                        {el.artists.map((artist,ind)=>{
                                            if(ind+1!==el.artists.length){
                                                return artist.name+'/'
                                            }else{
                                                return artist.name
                                            }
                                        })}
                                    </div>
                                </div>
                                
                            </div>
                        </li>
                    )
                })
                var loadStr = <div key={this.state.SPlist.length} className='bottomLoading'>
                {this. SPlistHasmore?(<p className="flex-hv-center"><span>加载中</span></p>):'没有更多'}
                </div>
                this.state.SPlist.length>15 && itemDom.push(loadStr)
            }else{
                let styles ={
                    height:'100%',
                    backgroundColor:'#f0f0f0',
                    height:'5.2rem'
                }
                itemDom=<NotFound style={styles} icon='static/images/noData.png'/>
            }
            break;
            case 'ZBDTlist':
            if(this.state.ZBDTlist && this.state.ZBDTlist.length){
                itemDom=this.state.ZBDTlist.map((el,index)=>{
                    return (
                        <li className="ZBDTlist item flex-warp flex-between flex-middle" key={index}>
                            <div className="coverImg"><img src={el.picUrl} alt=""/></div>
                            <div className="sinerName flex-con flex-warp flex-middle">
                                <div className="txtWarp">
                                    <div className="ellipsis">
                                        {el.name}
                                    </div>
                                    <div className="author ellipsis">
                                        {el.dj.nickname}
                                    </div>
                                </div>
                                
                            </div>
                        </li>
                    )
                })
                var loadStr = <div key={this.state.ZBDTlist.length} className='bottomLoading'>
                {this. ZBDTlistHasmore?(<p className="flex-hv-center"><span>加载中</span></p>):'没有更多'}
                </div>
                this.state.ZBDTlist.length>15 && itemDom.push(loadStr)
            }else{
                let styles ={
                    height:'100%',
                    backgroundColor:'#f0f0f0',
                    height:'5.2rem'
                }
                itemDom=<NotFound style={styles} icon='static/images/noData.png'/>
            }
            break;
            case 'YHlist':
            if(this.state.YHlist && this.state.YHlist.length){
                itemDom=this.state.YHlist.map((el,index)=>{
                    return (
                        <li className="YHlist item flex-warp flex-between flex-middle" key={index}>
                        <div className="coverImg"><img src={el.avatarUrl} alt=""/></div>
                        <div className="sinerName flex-con flex-warp flex-middle">
                            <div className="txtWarp">
                                <div className="ellipsis">
                                    {el.nickname}
                                </div>
                                <div className="author ellipsis">
                                </div>
                            </div>
                            
                        </div>
                    </li>
                    )
                })
                var loadStr = <div key={this.state.YHlist.length} className='bottomLoading'>
                {this. YHlistHasmore?(<p className="flex-hv-center"><span>加载中</span></p>):'没有更多'}
                </div>
                this.state.YHlist.length>15 && itemDom.push(loadStr)
            }else{
                let styles ={
                    height:'100%',
                    backgroundColor:'#f0f0f0',
                    height:'5.2rem'
                }
                itemDom=<NotFound style={styles} icon='static/images/noData.png'/>
            }
            break;
            default:return;
        }
        
        return (<div className={`dqListWarp dqListWarp-${this.props.slideBlock}`}>
                    <ul className="dqList">
                        {itemDom}
                    </ul>
                </div>)
    }
}

function mapStateToProps(state){
    return {
        states:state.tyStore
    }
}

function mapDispatchToProps (dispatch){
    return {
        handerTy:bindActionCreators(actions,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SongList);
// export default SongList
