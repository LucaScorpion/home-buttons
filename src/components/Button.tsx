import Icon from '@mdi/react';
import * as mdi from '@mdi/js';
import gridConfig from '../grid.json';

export interface Props {
  icon: string;
  label: string;
}

export const Button = ({ icon, label }: Props) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const i = mdi[icon] as string;

  return (
    <div className="button">
      <Icon path={i} size={gridConfig.iconSize} />
      {label}
    </div>
  );
};
