import { useState, useEffect } from 'react';

// 先定义数据类型（你已有的 apiDataProps）
interface apiDataProps {
  body: string;
  id: number;
  title: string;
  userId: number;
}

// 组件接收 url 作为属性，返回 JSX
export function GetApiData2({ url }: { url: string }) {
  const nullApidata: apiDataProps = {
    body: '',
    id: 0,
    title: '',
    userId: 0
  };
  const [data, setData] = useState<apiDataProps>(nullApidata);
  const [loading, setLoading] = useState(true); // 新增加载状态

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then((resData: apiDataProps) => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        console.error('请求失败:', err);
        setLoading(false);
      });
  }, [url]); // 依赖加 url，url 变化时重新请求

  // 组件必须返回 JSX（ReactNode）
  if (loading) return <div>加载中...</div>;
  
  return (
    <div style={{ padding: '20px', border: '1px solid #eee' }}>
      <h3>{data.title}</h3>
      <p>ID: {data.id}</p>
      <p>用户ID: {data.userId}</p>
      <p>{data.body}</p>
    </div>
  );
}