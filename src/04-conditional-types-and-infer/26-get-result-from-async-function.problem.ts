import { Equal, Expect } from "../helpers/type-utils";

const getServerSideProps = async () => {
  const data = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  const json: { title: string } = await data.json();
  return {
    props: {
      json,
    },
  };
};

// type InferPropsFromServerSideFunction<
//   T extends (...args: any[]) => Promise<{ props: { json: any } }>
// > = Awaited<ReturnType<T>>["props"];

// alternative with infer... but Awaited already does this probably so it is sort of the same
type InferPropsFromServerSideFunction<
  T extends (...args: any[]) => Promise<{ props: any }>
> = ReturnType<T> extends Promise<{ props: infer TResult }> ? TResult : never;

type tests = [
  Expect<
    Equal<
      InferPropsFromServerSideFunction<typeof getServerSideProps>,
      { json: { title: string } }
    >
  >
];
