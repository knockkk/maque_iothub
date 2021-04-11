import { useState } from 'react';
import ProForm, {
  ProFormText,
  ProFormTextArea,
  ProFormSelect,
} from '@ant-design/pro-form';
import { Modal, Tabs } from 'antd';

const { TabPane } = Tabs;
interface Props {
  title?: string;
  initialValues?: API.FuncDef;
  onSubmit?: (value: API.FuncDef) => void;
  visible?: boolean;
  onCancel?: () => void;
}
const tabMap = {
  property: '属性',
  service: '服务',
  event: '事件',
};
type TTabKey = 'property' | 'service' | 'event';
export default (props: Props) => {
  const [tabKey, setTabKey] = useState<TTabKey>('property');
  const PropertyForm = () => {
    return (
      <ProForm<API.FuncDef>
        onFinish={async (values) => {
          props.onSubmit &&
            props.onSubmit({ ...values, funcType: tabMap[tabKey] });
        }}
        initialValues={props.initialValues}
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="funcName"
            label="功能名称"
            placeholder="请输入功能名称"
            required
          />
          <ProFormText
            width="md"
            name="funcKey"
            tooltip="同一产品标识符不可重复"
            label="标识符"
            placeholder="请输入标识符"
            required
          />
          <ProFormSelect
            options={[
              {
                value: 'int32',
                label: 'int32',
              },
              {
                value: 'bool',
                label: 'bool',
              },
            ]}
            width="md"
            name="dataType"
            label="数据类型"
            required
          />
          <ProFormSelect
            options={[
              {
                value: 'm',
                label: '米 / m',
              },
              {
                value: '°C',
                label: '摄氏度 / °C',
              },
            ]}
            width="md"
            name="unit"
            label="单位"
          />
          <ProFormTextArea name="description" width="md" label="描述" />
        </ProForm.Group>
      </ProForm>
    );
  };
  return (
    <Modal
      title={props.title}
      visible={props.visible}
      onCancel={props.onCancel}
      footer={[]}
    >
      <Tabs
        activeKey={tabKey}
        onChange={(key) => setTabKey(key)}
        size="small"
        type="card"
      >
        <TabPane tab={tabMap.property} key="property">
          <PropertyForm />
        </TabPane>
        <TabPane tab={tabMap.service} key="service">
          服务
        </TabPane>
        <TabPane tab={tabMap.event} key="event">
          事件
        </TabPane>
      </Tabs>
    </Modal>
  );
};
