import { ApiService } from './ApiService';
import { config } from '../config';

export class HassService {
  public static readonly NAME = 'HassService';

  private readonly api: ApiService;

  public constructor() {
    this.api = new ApiService({
      baseUrl: config.hass.url,
      bearerToken: config.hass.token,
    });
  }

  public ping(): Promise<object> {
    return this.api.jsonGet('/api/');
  }
}
