import axios from 'axios';
import { ApiResponse, Response } from './response';
import { SERVER_ADDRESS } from '../../config';

export async function apiRequest<T>(
  url: string,
  method: 'get' | 'post' | 'put' | 'patch' | 'delete',
  body?: Record<string, unknown>,
): Promise<ApiResponse<T>> {
  const { data } = await axios
    .request<ApiResponse<T>>({
      url: `${SERVER_ADDRESS}/v1${url}`,
      method,
      data: body,
    })
    .catch(() => ({
      data: Response.error('API request failed'),
    }));

  return data;
}
