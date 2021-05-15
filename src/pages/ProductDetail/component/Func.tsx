import { Table, message } from 'antd';
import { useEffect, useState } from 'react';
import { Space } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';
import FuncModal from './FuncModal';
import styles from '../index.less';
import { getProductFunc, addProductFunc, deleteProductFunc } from '@/apis/user';
interface Props {
  productKey?: string;
}

export default (props: Props) => {
  const [funcArr, setFuncArr] = useState<API.FuncDef[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  useEffect(() => {
    props.productKey && requestFuncArr(props.productKey);
  }, []);

  const requestFuncArr = async (productKey: string) => {
    try {
      setLoading(true);
      const arr = await getProductFunc(productKey);
      setFuncArr(arr);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };
  const addClick = () => {
    setIsModalVisible(true);
  };

  const dataSource = Array.isArray(funcArr)
    ? funcArr.map((item, index) => {
        return {
          ...item,
          key: index,
        };
      })
    : [];
  const handleSubmit = async (values: API.FuncDef) => {
    setIsModalVisible(false);
    try {
      if (props.productKey) {
        const resp = await addProductFunc(props.productKey, values);
        if (resp.status === 200) {
          requestFuncArr(props.productKey);
          message.success('添加成功');
          return;
        }
      }
    } catch (err) {
      console.log(err);
    }
    message.error('添加失败');
  };
  const handleDelete = async (item: API.FuncDef) => {
    if (props.productKey && item.funcKey) {
      try {
        await deleteProductFunc(props.productKey, item.funcKey);
        requestFuncArr(props.productKey);
        message.success('删除成功');
      } catch (err) {
        console.log(err);
      }
    } else {
      message.error('删除失败');
    }
  };

  const columns = [
    {
      title: '功能类型',
      dataIndex: 'funcType',
      key: 'funcType',
    },
    {
      title: '功能名称',
      dataIndex: 'funcName',
      key: 'funcName',
    },
    {
      title: '标识符',
      dataIndex: 'funcKey',
      key: 'funcKey',
    },
    {
      title: '数据类型',
      dataIndex: 'dataType',
      key: 'dataType',
    },
    {
      title: '数据定义',
      dataIndex: 'definition',
      key: 'definition',
    },
    {
      title: '单位',
      dataIndex: 'unit',
      key: 'unit',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '操作',
      key: 'action',
      render: (item: API.FuncDef) => (
        <Space size="small">
          <a onClick={() => handleDelete(item)}>删除</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Space style={{ marginBottom: '10px' }}>
        <div className={styles.title}>功能定义</div>

        <PlusCircleOutlined onClick={addClick} className={styles.optionIcon} />
        <div onClick={addClick} className={styles.optionText}>
          添加
        </div>
      </Space>
      <FuncModal
        title="添加功能"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleSubmit}
      />
      <Table
        loading={loading}
        dataSource={dataSource}
        columns={columns}
        bordered
      />
    </>
  );
};
