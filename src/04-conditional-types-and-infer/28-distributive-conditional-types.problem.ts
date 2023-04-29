import { Equal, Expect } from "../helpers/type-utils";

type Fruit = "apple" | "banana" | "orange";

type GetAppleOrBanana<T> = T extends "apple" | "banana" ? T : never;

// type AppleOrBanana = Fruit extends "apple" | "banana" ? Fruit : never;
// okay this is really weird
type AppleOrBanana = GetAppleOrBanana<"apple" | "banana">;

type tests = [Expect<Equal<AppleOrBanana, "apple" | "banana">>];
