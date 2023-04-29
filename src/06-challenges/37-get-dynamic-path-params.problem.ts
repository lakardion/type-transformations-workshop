import { Equal, Expect } from "../helpers/type-utils";
import { SplitString } from "../03-template-literals/17-splitting-strings.problem";

type UserPath = "/users/:id";

type UserOrganisationPath = "/users/:id/organisations/:organisationId";

/**
 * mental map
 * 1. Split the string into its components
 * 2. Analyze each string and take it only if its a url param
 * 3. use it as a key
 * 4. Create the type mapping
 */
type ExtractPathParams<T extends string> = {
  [K in SplitString<T, "/">[number] as K extends `:${infer TParamKey}`
    ? TParamKey
    : never]: string;
};

type tests = [
  Expect<Equal<ExtractPathParams<UserPath>, { id: string }>>,
  Expect<
    Equal<
      ExtractPathParams<UserOrganisationPath>,
      { id: string; organisationId: string }
    >
  >
];
