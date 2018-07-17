
import {combineReducers} from 'redux'
import * as types from './type'

const initialState = {
    test:'hello wrold',
}

function tyStore(state=initialState,action){
    switch(action.type){
        case 'SEARCH_SLIDE' :
            return {...state,...action.data}
        case 'SHOW_PLAYER' :
            return {...state,...action.data}
        case 'PLAY_SONG' :
        console.log({...state,...action.data})
            return {...state,...action.data}
        default:
            return state
        
        
    }
}

const tyReducer = combineReducers({
    tyStore
})
export default tyReducer
