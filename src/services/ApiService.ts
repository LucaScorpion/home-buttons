export interface ApiOptions {
  baseUrl: string;
  bearerToken: string;
}

export class ApiService {
  private readonly defaultHeaders: Record<string, string>;

  public constructor(private readonly options: ApiOptions) {
    this.defaultHeaders = {
      Accept: 'application/json',
      Authorization: `Bearer ${options.bearerToken}`,
    };
  }

  private static async handleResponse<T>(resPromise: Promise<Response>): Promise<T> {
    const response = await resPromise;
    const responseBody = response.status === 204 ? undefined : await response.json();

    if (response.status >= 400) {
      throw responseBody;
    }

    return responseBody;
  }

  private getUrl(path: string, params?: Record<string, string>): string {
    const paramString = params ? `?${new URLSearchParams(params)}` : '';
    return `${this.options.baseUrl}${path}${paramString}`;
  }

  private jsonRequest<T>(
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
    path: string,
    body?: unknown,
    params?: Record<string, string>,
  ): Promise<T> {
    const headers = this.defaultHeaders;
    if (body) {
      headers['Content-Type'] = 'application/json';
    }

    return ApiService.handleResponse(
      fetch(this.getUrl(path, params), {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
      }),
    );
  }

  public jsonGet<T>(path: string, params?: Record<string, string>): Promise<T> {
    return this.jsonRequest('GET', path, undefined, params);
  }

  public jsonPost<T, S>(path: string, body: T, params?: Record<string, string>): Promise<S> {
    return this.jsonRequest<S>('POST', path, body, params);
  }
}
