import { getProducts } from '@/apis/user';
import { useEffect, useState } from 'react';
import { Select } from 'antd';
const { Option } = Select;
interface Props {
  currPK?: string;
  onChange?: (pk: string) => void;
}
export default (props: Props) => {
  const [productList, setProductList] = useState<API.Product[]>([]);
  useEffect(() => {
    getProductList();
  }, []);
  const getProductList = async () => {
    try {
      const list: API.Product[] = await getProducts();
      setProductList(list);
    } catch (err) {
      console.log(err);
    }
  };
  const options = Array.isArray(productList)
    ? productList.map((item) => {
        return {
          value: item.productKey || '',
          label: item.productName || '',
        };
      })
    : [];
  const handleChange = (value: string) => {
    props.onChange && props.onChange(value);
  };
  return (
    <Select
      value={props.currPK}
      onChange={handleChange}
      style={{ width: '150px' }}
    >
      <Option value="">所有产品</Option>
      {options.map((o) => (
        <Option value={o.value} key={o.value}>
          {o.label}
        </Option>
      ))}
    </Select>
  );
};
