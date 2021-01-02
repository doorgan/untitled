import * as flyd from "flyd";
import { store } from "./state";

test('Creates a stream with the initial state', () => {
  const Store = store({ foo: 1 });
  expect(flyd.isStream(Store)).toBe(true);
  expect(Store()).toEqual({ foo: 1 });
})

describe('Store can be updated', () => {
  test('With object patch', () => {
    const Store = store({ foo: 1 });

    Store.update({ foo: 5 });
    expect(Store()).toEqual({ foo: 5 });
  })

  test("With function patch", () => {
    const Store = store({ foo: 1 });

    Store.update(_state => {
      return { foo: 0 };
    });
    expect(Store()).toEqual({ foo: 0 });

    Store.update(state => {
      state.foo++;
      return state;
    });
    expect(Store()).toEqual({ foo: 1 });
  })
})
