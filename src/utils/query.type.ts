type StringQuery = string | RegExp;

type NumberQuery = number | RangeQuery;

export type RangeQuery = { $gte?: number; $lte?: number };

export type QueryParams<T> = {
  [K in keyof T]?: T[K] extends string
    ? StringQuery
    : T[K] extends number
    ? NumberQuery
    : T[K];
};
