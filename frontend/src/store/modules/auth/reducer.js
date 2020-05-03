import produce from 'immer';

const INITTIAL_STATE ={
    toke: null,
    signed: false,
    loading: false,
}

export default function auth(state = INITTIAL_STATE, action){
    switch (action.type) {
        case '@auth/SIGN_IN_SUCCESS':
            return produce(state, draft => {
                draft.token = action.payload.token;
                draft.signed = true;
            });
        default:
            return state;
    }
}
