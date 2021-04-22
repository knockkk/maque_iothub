import { Chart, Axis, Tooltip, LineAdvance } from 'bizcharts';
export interface IDataItem {
  x: any;
  y: any;
}
interface Props {
  data?: IDataItem[];
  color?: string;
}
export default (props: Props) => {
  const { data = [], color } = props;
  const tooltip: [
    string,
    (...args: any[]) => { name?: string; value: string },
  ] = [
    'x*y',
    (x: string, y: string) => ({
      name: x,
      value: y,
    }),
  ];
  return (
    <Chart autoFit height={60} data={data} scale={{ y: { min: 0 } }}>
      <Axis name="x" visible={false} />
      <Axis name="y" visible={false} />
      <Tooltip showTitle={false} />
      <LineAdvance
        shape="smooth"
        area
        position="x*y"
        tooltip={tooltip}
        color={color}
      />
    </Chart>
  );
};
