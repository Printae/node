export const Response = {
  ok: <T>(data: T) =>
    ({
      status: 'ok',
      data,
    }) as OkResponse<T>,
  error: (message: string) =>
    ({
      status: 'error',
      message,
    }) as ErrorResponse,
};

type OkResponse<T> = {
  status: 'ok';
  data: T;
};

type ErrorResponse = {
  status: 'error';
  message: string;
};

export type ApiResponse<T> = OkResponse<T> | ErrorResponse;
