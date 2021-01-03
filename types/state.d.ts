export declare type FunctionPatch<T> = (state: T) => T;
export declare type Patch<T> = FunctionPatch<T> | Partial<T>;
export interface Stream<T> {
    (): T;
    (value: T): Stream<T>;
    map<V>(project: (value: T) => V): Stream<V>;
    end: Stream<boolean>;
    val: T;
}
export declare type Store<T> = Stream<T> & {
    update: Stream<Patch<T>>;
};
export declare const store: <T extends object>(initial: T) => Store<T>;
