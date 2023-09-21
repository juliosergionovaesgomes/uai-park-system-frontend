import { createReducer, createSelector, on } from '@ngrx/store';
import { getToken, setToken } from './token.actions';

export interface TokenState {
  token: string;
}

const initialState: { token: string } = {
  token: '',
};

export const tokenReducer = createReducer(
  initialState,
  on(getToken, (state, { token }) => ({ token })),
  on(setToken, (state, { token }) => ({ ...state, token }))
);

export const tokenSelector = createSelector(
  (state: TokenState) => state.token,
  (token: string) => token
);
