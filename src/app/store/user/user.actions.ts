import { createAction } from '@ngrx/store';
import { User } from 'src/app/types/user';

export const getUser = createAction('[User] Get User', (user: User) => ({
  user,
}));
export const addUser = createAction('[User] Create User', (user: User) => ({
  user,
}));
export const setUser = createAction('[User] Set User', (user: User) => ({
  user,
}));
