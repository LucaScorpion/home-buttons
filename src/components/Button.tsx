import Icon from '@mdi/react';
import * as mdi from '@mdi/js';
import gridConfig from '../grid.json';
import { useService } from '../hooks/useService';
import { HassService, OnOffState } from '../services/HassService';
import { useEffect, useState } from 'react';
import { classNames } from '../utils/classNames';

export interface Props {
  icon: string;
  label: string;
  entity: string;
  domain?: string;
  service?: string;
}

export const Button = ({ icon, label, entity, domain, service }: Props) => {
  const hass = useService(HassService);
  const [state, setState] = useState<OnOffState>();

  useEffect(() => {
    hass.getState(entity).then((s) => setState(s.state));
  }, [entity, hass]);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const i = mdi[icon] as string;

  return (
    <div
      className={classNames('button', state)}
      onClick={() => {
        hass
          .callService(domain || 'light', service || 'toggle', entity)
          .then((s) => setState(s?.state));
      }}
    >
      <Icon path={i} size={gridConfig.iconSize} />
      {label}
    </div>
  );
};
