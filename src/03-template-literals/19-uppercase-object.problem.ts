import { Equal, Expect } from "../helpers/type-utils";

type Event = `log_in` | "log_out" | "sign_up";

type ObjectOfKeys = {
  [K in Event as Uppercase<K>]: string;
};

type tests = [
  Expect<
    Equal<
      ObjectOfKeys,
      {
        LOG_IN: string;
        LOG_OUT: string;
        SIGN_UP: string;
      }
    >
  >
];
