import { Chart, Line, Point, Tooltip } from 'bizcharts';

interface ListItem {
  date: string;
  value: string;
}
interface Props {
  list?: ListItem[];
}
export default (props: Props) => {
  const data = Array.isArray(props.list)
    ? props.list.map((item) => {
        const dateStr = item.date;
        let [d, t] = dateStr.split(' ');
        d = d.split('-')[1] + '-' + d.split('-')[2];
        return {
          date: d + '/' + t,
          value: item.value,
        };
      })
    : [];
  return (
    <Chart autoFit height={320} data={data}>
      <Point position="date*value" shape="circle" />
      <Line shape="smooth" position="date*value" label="value" />
      <Tooltip shared showCrosshairs />
    </Chart>
  );
};
