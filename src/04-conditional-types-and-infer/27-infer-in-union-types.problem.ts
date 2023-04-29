import { Equal, Expect } from "../helpers/type-utils";

const parser1 = {
  parse: () => 1,
};

const parser2 = () => "123";

const parser3 = {
  extract: () => true,
};

// so this is probably too broad, it does the trick and I felt it was a good solution at the beginning. Probable I would like the parsers to actually have a good defined type rather than just being anything so the inference would be easier to perform at this time. I would probably expect something like type Parser<T> = ()=>T | {parse:()=>T} | {extract:()=>T} (super simplified, surely you would expect arguments here...)
// type GetParserResult<T> = T extends () => infer TReturn
//   ? TReturn
//   : T extends { [K in string]: () => infer TReturn }
//   ? TReturn
//   : never;

// This one on the other hand seems actually pretty good and less generalized to anything at all. We could actually simplify this by defining the potential types of a parser with a Union type and then do the inference in this type helper as in T extends Parser<infer TRes> ? TRes : never
type GetParserResult<T> = T extends
  | (() => infer TRes)
  | { parse: () => infer TRes }
  | { extract: () => infer TRes }
  ? TRes
  : never;

type tests = [
  Expect<Equal<GetParserResult<typeof parser1>, number>>,
  Expect<Equal<GetParserResult<typeof parser2>, string>>,
  Expect<Equal<GetParserResult<typeof parser3>, boolean>>
];
