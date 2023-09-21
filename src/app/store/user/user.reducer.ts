import { createReducer, createSelector, on } from '@ngrx/store';
import { User } from 'src/app/types/user';
import { addUser, getUser, setUser } from './user.actions';

export interface UserState {
  user: User;
}

const initialState: User = {
  email: '',
  first_name: '',
  last_name: '',
};

export const userReducer = createReducer(
  initialState,
  on(getUser, (state, { user }) => user), //Recupera o usuário logado
  on(setUser, (state, { user }) => ({ ...state, user })), //Seta o usuário logado
  on(addUser, (state, { user }) => ({ ...state, user })) //Cria usuário
);

export const userSelector = createSelector(
  (state: UserState) => state.user,
  (user: User) => user
);
