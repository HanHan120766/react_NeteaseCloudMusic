import { applyMiddleware,createStore } from 'redux'
import tyReducer from './reducer'
import thunk from "redux-thunk";
// export default function configureStore(initialState) {
//     // const store = createStore(rootReducer, initialState,
//     //     // 触发 redux-devtools
//     //     window.devToolsExtension ? window.devToolsExtension() : undefined
//     // )
//     const store = createStore(testReducer, initialState)
//     return store
// }
const store = createStore(
    tyReducer,
    applyMiddleware(thunk)
)
export default store
