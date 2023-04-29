import { Equal, Expect } from "../helpers/type-utils";

type Fruit =
  | {
      name: "apple";
      color: "red";
    }
  | {
      name: "banana";
      color: "yellow";
    }
  | {
      name: "orange";
      color: "orange";
    };

//First shot:: I had done this before even knowing about the key remapping with discriminated unions. The other solution I crafted after learning that blatantly shows how harder it was to do something as simple as this without that feature
// type GetTransformedFruit<T> = T extends { name: infer Name; color: infer Color }
//   ? Name extends string
//     ? Color extends string
//       ? `${Name}:${Color}`
//       : never
//     : never
//   : never;
// // type TransformedFruit = Fruit extends {name:string,color:string} ? `${Fruit['name']}:${Fruit['color']}` : never
// type TransformedFruit = GetTransformedFruit<Fruit>;
//    ^?

type TransformedFruit = {
  [F in Fruit as F["name"]]: `${F["name"]}:${F["color"]}`;
}[Fruit["name"]];

type tests = [
  Expect<
    Equal<TransformedFruit, "apple:red" | "banana:yellow" | "orange:orange">
  >
];
