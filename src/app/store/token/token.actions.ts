import { createAction } from '@ngrx/store';

export const getToken = createAction('[Token] Get token', (token: string) => ({
  token,
}));
export const setToken = createAction('[Token] Set token', (token: string) => ({
  token,
}));
