import flyd from "flyd";
import merge from "mergerino";

const { stream, scan } = flyd;

export type FunctionPatch<T> = (state: T) => T;
export type Patch<T> = FunctionPatch<T> | Partial<T>;

export interface Stream<T> {
  (): T;
  (value: T): Stream<T>;
  map<V>(project: (value: T) => V): Stream<V>;
  end: Stream<boolean>;
  val: T;
}

export type Store<T> = Stream<T> & {
  update: Stream<Patch<T>>;
};

export const store = <T extends object>(initial: T): Store<T> => {
  const update = stream<Patch<T>>();
  const states = scan(
    (state: T, patch: Patch<T>): T => merge(state, patch),
    initial,
    update
  );

  return Object.assign(states, { update });;
};
