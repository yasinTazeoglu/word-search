import { createStore} from "redux";
import {combineReducers} from 'redux';
import captionReducer from '../reducers/caption.reducer';
import wordReducer from '../reducers/word.reducer';
const allReducer=combineReducers({
   caption:captionReducer,
   word:wordReducer
})
const composeEnhancers = window.devToolsExtension && window.devToolsExtension();
export default  createStore(allReducer, {}, composeEnhancers)
