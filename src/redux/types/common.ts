export interface ResourceBase {
  id: number;
  name: string;
  url: string;
  created: string;
}

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface PaginateResponse<T> {
  info?: Info;
  results?: T;
  error?: string;
}

export interface ResponseError {
  status: number;
  data: {
    error: string;
  };
}
