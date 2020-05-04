import { takeLatest, call, put, all } from 'redux-saga/effects';

import { toast } from 'react-toastify';
import history from '~/services/history';
import api from '~/services/api';

import { SignInSuccess, SignFailure } from './actions';

export function* signIn({ payload }) {
    try {
            const { email, password, } = payload;

            const response = yield call(api.post, 'sessions', {
                email,
                password,
            });

            const { token, user } = response.data;

            if(!user.provider) {
                toast.error('Usuario não é prestador');
                return;
            }

            yield put(SignInSuccess(token, user));

            history.push('/dashboard');
    } catch (err) {
        toast.error('Falha na authenticação, verifique seus dados');
        yield put(SignFailure());
    }

}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);
