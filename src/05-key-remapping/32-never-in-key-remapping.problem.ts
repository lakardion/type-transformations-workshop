import { Equal, Expect } from "../helpers/type-utils";

interface Example {
  name: string;
  age: number;
  id: string;
  organisationId: string;
  groupId: string;
}

//okay Im proud of my solution but we could also do what Matt suggested and stole a GASP from me
// type OnlyIdKeys<T> = {
//   [K in Extract<keyof T, `${string}Id` | "id">]: T[K];
//   // [K in keyof Example]: K extends "id" | `${string}Id` ? Example[K] : never;
// };

// We can use never to remove keys from an object map which is insane. I had always failed miserable at removing keys with object mapping because I had always assigned a never VALUE (rather than a key) expecting that to remove the entry.
// This is also a good refresher about the fact that we can use conditional types within the key mapping
type OnlyIdKeys<T> = {
  [K in keyof T as K extends `${string}${"id" | "Id"}${string}`
    ? K
    : never]: T[K];
  // [K in keyof Example]: K extends "id" | `${string}Id` ? Example[K] : never;
};

type tests = [
  Expect<
    Equal<
      OnlyIdKeys<Example>,
      {
        id: string;
        organisationId: string;
        groupId: string;
      }
    >
  >,
  Expect<Equal<OnlyIdKeys<{}>, {}>>
];
