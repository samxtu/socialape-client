import { LOADING_UI, SET_ERRORS, CLEAR_ERRORS, STOP_LOADING, COMMENT } from '../types';

const initialState = {
    loading: false,
    errors: {},
    commentFocus: false
}

export default function uiReducer(state = initialState, action) {
    switch(action.type){
        case SET_ERRORS: 
            return {
                ...state,
                loading: false,
                errors: action.payload
            }
        case CLEAR_ERRORS: 
            return {
                ...state,
                loading: false,
                errors: {}
            }
        case LOADING_UI:
            return {
                ...state,
                loading: true
            }
        case STOP_LOADING:
            return {
                ...state,
                loading: false
            }
        case COMMENT:
            let bool;
            if(state.commentFocus === true){
                bool = false
            } else{
                bool = true
            }
            return {
                ...state,
                commentFocus: bool
            }
        default: 
            return state;
    }
}