import { ApiService } from './ApiService';
import { config } from '../config';

export interface StateResult {
  state: 'on' | 'off';
}

export class HassService {
  public static readonly NAME = 'HassService';

  private readonly api: ApiService;

  public constructor() {
    this.api = new ApiService({
      baseUrl: config.hass.url,
      bearerToken: config.hass.token,
    });
  }

  public getState(entityId: string): Promise<StateResult> {
    return this.api.jsonGet(`/api/states/${entityId}`);
  }

  public callService(
    domain: string,
    service: string,
    entityId: string
  ): Promise<StateResult[]> {
    return this.api.jsonPost(`/api/services/${domain}/${service}`, {
      entity_id: entityId,
    });
  }
}
