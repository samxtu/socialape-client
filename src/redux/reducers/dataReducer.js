import { DELETE_COMMENT, LOADING_DATA, SET_SCREAM, SET_SCREAMS, LIKE_SCREAM, UNLIKE_SCREAM, DELETE_SCREAM, ADD_SCREAM, ADD_COMMENT, CLEAR_SCREAM } from '../types';

const initialState = {
    screams : [],
    scream : {},
    loading: false
}

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading : true
            }
        case SET_SCREAMS:
            return {
                ...state,
                screams : action.payload,
                loading : false
            }
        case SET_SCREAM:
            return {
                ...state,
                scream : action.payload,
                loading : false
            }
        case LIKE_SCREAM:
        case UNLIKE_SCREAM:
            let index = state.screams.findIndex(scream => scream.screamId === action.payload.screamId);
            state.screams[index] = action.payload;
            if(state.scream.screamId === action.payload.screamId){
                state.scream = action.payload;
            }
            return {
                ...state
            }
        case DELETE_SCREAM:
            let newindex = state.screams.findIndex(scream => scream.screamId === action.payload);
            state.screams.splice(newindex,1);
            return {
                ...state
            }
        case DELETE_COMMENT: 
        let newindexxx = state.screams.findIndex(scream => scream.screamId === action.payload.screamId);
            state.screams[newindexxx] = {
                ...state.screams[newindexxx],
                commentCount: state.screams[newindexxx].commentCount-1
            };
            let newindexxxx = state.scream.comments.findIndex(comment => comment.commentId === action.payload.commentId);
                state.scream.comments.splice(newindexxxx,1);
            return {
                ...state,
                scream: {
                    ...state.scream,
                    commentCount: state.scream.commentCount-1
                }
            }
        case ADD_SCREAM:
            return {
                ...state,
                screams: [
                    action.payload,
                    ...state.screams
                ]
            }
        case CLEAR_SCREAM:
            return{
                ...state,
                scream: {}
            }
        case ADD_COMMENT:
            let newindexx = state.screams.findIndex(scream => scream.screamId === action.payload.screamId);
            state.screams[newindexx] = {
                ...state.screams[newindexx],
                commentCount: state.screams[newindexx].commentCount+1
            };
            return {
                ...state,
                scream: {
                    ...state.scream,
                    commentCount: state.scream.commentCount+1,
                    comments: [
                        action.payload,
                        ...state.scream.comments
                    ]
                }
            }
        default:
            return state;
    }
}