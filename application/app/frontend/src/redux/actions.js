import { EXAMPLE_CONSTANT1, EXAMPLE_CONSTANT2 } from "./constants";

export function exampleAction1() {
  return { type: EXAMPLE_CONSTANT1 };
}

export function exampleAction2(value) {
  return { type: EXAMPLE_CONSTANT2, value: value };
}
