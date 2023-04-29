import { Equal, Expect } from "../helpers/type-utils";

interface Attributes {
  id: string;
  email: string;
  username: string;
}

/**
 * How do we create a type helper that represents a union
 * of all possible combinations of Attributes?
 */
type MutuallyExclusive<T> = {
  // this is interesting. I ended up solving it but probably the suggested solution is more straight forward. Instead of doing a sub-mapping of the type he used a `Record<K,T[K]> which pretty much is what i had declared here
  [K in keyof T]: {
    [SK in K]: T[K];
  };
}[keyof T];

type ExclusiveAttributes = MutuallyExclusive<Attributes>;

type tests = [
  Expect<
    Equal<
      ExclusiveAttributes,
      | {
          id: string;
        }
      | {
          email: string;
        }
      | {
          username: string;
        }
    >
  >
];
