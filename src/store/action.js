import * as types from './type'

//搜素结果滑块
export function searchSlide (data){
    return {
        type:types.SEARCH_SLIDE,
        data
    }
}
//播放器相关
export function showPlayer (data){
    return {
        type:types.SHOW_PLAYER,
        data
    }
}
//选择歌曲
export function selectSong (data){
    let mp3_url = `http://music.163.com/song/media/outer/url?id=${data.id}.mp3`
    return dispatch =>{
        //显示播放器
        dispatch(showPlayer({showPlayer:true}))
        //获取歌曲详细信息
        wyx.ajax({
            url:'/song/detail',
            data:{ids:data.id},
            dataType:'json',
            showLoading:true,
            success(res){
               if (res.code==200){
                   const song = res.songs[0] || {}
                   //开始播放
                    dispatch(playSong({...data,mp3_url,song}))
               }
            }
        })
    }
}

//播放歌曲
export function playSong (data){
    return {
        type:types.PLAY_SONG,
        data
    }
}











