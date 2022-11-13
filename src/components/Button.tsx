import Icon from '@mdi/react';
import * as mdi from '@mdi/js';
import gridConfig from '../grid.json';
import { useService } from '../hooks/useService';
import { HassService } from '../services/HassService';

export interface Props {
  icon: string;
  label: string;
  entity: string;
  domain?: string;
  service?: string;
}

export const Button = ({ icon, label, entity, domain, service }: Props) => {
  const hass = useService(HassService);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const i = mdi[icon] as string;

  return (
    <div
      className="button"
      onClick={() => {
        hass
          .callService(domain || 'light', service || 'toggle', entity)
          .then(console.log)
          .catch(console.error);
      }}
    >
      <Icon path={i} size={gridConfig.iconSize} />
      {label}
    </div>
  );
};
