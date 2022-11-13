import gridConfig from '../grid.json';
import { Button } from './Button';

export const Grid = () => (
  <div className="grid">
    {gridConfig.buttons.map((b, i) => (
      <Button key={i} {...b} />
    ))}
  </div>
);
