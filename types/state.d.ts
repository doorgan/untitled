export declare type FunctionPatch<T> = (state: T) => T;
export declare type Patch<T> = FunctionPatch<T> | Partial<T>;
export declare type Stream<T> = flyd.Stream<T>;
export declare type Store<T> = Stream<T> & {
    update: Stream<Patch<T>>;
};
export declare const store: <T extends object>(initial: T) => Store<T>;
