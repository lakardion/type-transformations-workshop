import { Equal, Expect } from "../helpers/type-utils";

type Route =
  | {
      route: "/";
      search: {
        page: string;
        perPage: string;
      };
    }
  | { route: "/about"; search: {} }
  | { route: "/admin"; search: {} }
  | { route: "/admin/users"; search: {} };

// type RoutesObject = {
//   [K in Route["route"]]: Extract<Route, { route: K }>["search"];
// };
//^ This is a bit verbose. Seems like there's a better solution out there:

/**
 * This teaches us that we can use ANY union to iterate over, not just string ones. The only important thing is that we spit out a valid key of this iteration. So in this case we iterating over all the objects in the union type. This is why we do R['search'] R is an object type not a Key. This saves us from having to do all the extracting logic we did in our "naive" approach
 */
type RoutesObject = {
  [R in Route as R["route"]]: R["search"];
};

type tests = [
  Expect<
    Equal<
      RoutesObject,
      {
        "/": {
          page: string;
          perPage: string;
        };
        "/about": {};
        "/admin": {};
        "/admin/users": {};
      }
    >
  >
];
