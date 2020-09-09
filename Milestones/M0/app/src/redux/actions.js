import { SET_PROFILE } from "./constants";

export function setScreenSize(profile) {
  return { type: SET_PROFILE, profile };
}
