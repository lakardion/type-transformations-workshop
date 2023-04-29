// Might come in handy!
import { S } from "ts-toolbelt";
// https://millsp.github.io/ts-toolbelt/modules/string_split.html

import { Equal, Expect } from "../helpers/type-utils";

type Path = "Users/John/Documents/notes.txt";

// Own implementation. Surely it has some edge cases to cover but this works!!
export type SplitString<
  TStr extends string,
  TDelimiter extends string
> = TStr extends `${infer TStart}${TDelimiter}${infer Rest}`
  ? TStart extends ""
    ? [...SplitString<Rest, TDelimiter>]
    : [TStart, ...SplitString<Rest, TDelimiter>]
  : [TStr];

// type SplitPath = S.Split<Path,'/'>;
type SplitPath = SplitString<Path, "/">;

type tests = [
  Expect<Equal<SplitPath, ["Users", "John", "Documents", "notes.txt"]>>
];
