import { ApiService } from './ApiService';
import { config } from '../config';

export interface StateResult {
  state: 'on' | 'off';
  entity_id: string;
  last_changed: string;
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

  public async callService(
    domain: string,
    service: string,
    entityId: string
  ): Promise<StateResult | undefined> {
    const results: StateResult[] = await this.api.jsonPost(
      `/api/services/${domain}/${service}`,
      {
        entity_id: entityId,
      }
    );

    return results
      .sort((a, b) => b.last_changed.localeCompare(a.last_changed))
      .find((s) => s.entity_id === entityId);
  }
}
