import { LOGIN, LOGOUT } from "../constants";

export function login(userObj) {
  return { type: LOGIN, userObj: userObj };
}

export function logout() {
  return { type: LOGOUT };
}
