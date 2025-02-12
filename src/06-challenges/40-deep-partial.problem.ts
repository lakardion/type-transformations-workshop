import { Equal, Expect } from "../helpers/type-utils";

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends null
    ? T[K]
    : T[K] extends Array<infer TElement>
    ? DeepPartial<TElement>[]
    : T[K] extends object
    ? DeepPartial<T[K]>
    : T[K];
};

type MyType = {
  a: string;
  b: number;
  c: {
    d: string;
    e: {
      f: string;
      g: {
        h: string;
        i: string;
      }[];
    };
  };
};

type Result = DeepPartial<MyType>;

type tests = [
  Expect<
    Equal<
      Result,
      {
        a?: string;
        b?: number;
        c?: {
          d?: string;
          e?: {
            f?: string;
            g?: {
              h?: string;
              i?: string;
            }[];
          };
        };
      }
    >
  >
];
