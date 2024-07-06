export type TDefaultFilterParams = {
  page: string;
};

export type RequestParameters<T = {}> = {
  params: { id: string };
  searchParams: FilterParam<T>;
};

export type FilterParam<T = {}> = TDefaultFilterParams & T;
