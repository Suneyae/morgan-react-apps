import './index.css';
import App from './App'; // 核心修复：添加相对路径 ./
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

// 获取根节点并渲染
const root = ReactDOM.createRoot(document.getElementById('root')!); // ! 非空断言，避免 TS 报错
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);



