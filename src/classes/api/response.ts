export const Response = {
  ok: <T>(data: T) => ({
    status: 'ok',
    data,
  }),
  error: (message: string) => ({
    status: 'error',
    message,
  }),
};
