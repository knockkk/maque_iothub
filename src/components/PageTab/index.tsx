import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi';
import { useEffect, useState } from 'react';

interface ITab {
  key: string;
  tab: string;
  component: JSX.Element;
}
interface Props {
  PageContent?: () => JSX.Element | null;
  tabList?: ITab[];
  headerTitle?: string;
  onBack?: () => void;
}
export default ({
  PageContent = () => null,
  tabList = [],
  headerTitle,
  onBack = () => {},
}: Props) => {
  const [activeKey, setActiveKey] = useState('');

  useEffect(() => {
    if (history.location.query && history.location.query.current) {
      const key = history.location.query.current as string;
      setActiveKey(key);
    } else {
      const firstTab = tabList[0] && tabList[0].key;
      setActiveKey(firstTab);
    }
  }, []);

  const tabContentMap: { [key: string]: any } = tabList.reduce((prev, curr) => {
    prev[curr.key] = curr.component;
    return prev;
  }, {});
  const TabContent = () => {
    return tabContentMap[activeKey] || null;
  };
  const pageTabList = tabList.map((item) => {
    return {
      tab: item.tab,
      key: item.key,
    };
  });

  const handleTabChange = (key: string) => {
    setActiveKey(key);
    history.push({
      query: {
        current: key,
      },
    });
  };

  return (
    <PageContainer
      fixedHeader
      header={{
        title: headerTitle,
        onBack,
      }}
      content={<PageContent />}
      tabList={pageTabList}
      tabActiveKey={activeKey}
      onTabChange={handleTabChange}
    >
      <TabContent />
    </PageContainer>
  );
};
