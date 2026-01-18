import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import './App.css';

// 1. 创建Context（用于跨组件状态共享）
const ThemeContext = createContext();

// 子组件：演示父传子、子传父、useContext
function TodoItem({ todo, onDelete, onToggle }) {
  // 使用useContext获取全局主题状态
  const { isDark } = useContext(ThemeContext);
  
  return (
    <div style={{ 
      padding: '8px 16px', 
      margin: '8px 0', 
      border: '1px solid #ddd', 
      borderRadius: '4px',
      backgroundColor: isDark ? '#333' : '#fff',
      color: isDark ? '#fff' : '#333'
    }}>
      <input 
        type="checkbox" 
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span style={{ 
        marginLeft: '8px',
        textDecoration: todo.completed ? 'line-through' : 'none'
      }}>
        {todo.text}
      </span>
      <button 
        onClick={() => onDelete(todo.id)}
        style={{ 
          marginLeft: '16px',
          padding: '4px 8px',
          backgroundColor: '#ff4444',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        删除
      </button>
    </div>
  );
}

function App() {
  // 2. useState：管理组件状态（列表、输入框、主题）
  const [todos, setTodos] = useState([
    { id: 1, text: '学习useState', completed: false },
    { id: 2, text: '学习useEffect', completed: true },
    { id: 3, text: '学习组件通信', completed: false }
  ]);
  const [inputText, setInputText] = useState('');
  const [isDark, setIsDark] = useState(false);
  
  // 3. useRef：获取DOM元素/保存可变值（不触发重渲染）
  const inputRef = useRef(null);
  
  // 4. useEffect：处理副作用（组件挂载/更新/卸载）
  // 场景1：组件挂载时聚焦输入框
  useEffect(() => {
    inputRef.current.focus();
    console.log('组件挂载完成，输入框自动聚焦');
  }, []); // 空依赖：仅挂载时执行
  
  // 场景2：监听todos变化，同步到本地存储
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
    console.log('待办列表已保存到本地存储');
    // 清理函数（组件卸载时执行）
    return () => {
      console.log('组件即将卸载，可做清理操作');
    };
  }, [todos]); // 依赖todos：todos变化时执行
  
  // 5. 事件处理：添加待办
  const handleAddTodo = () => {
    if (!inputText.trim()) return;
    const newTodo = {
      id: Date.now(), // 用时间戳做唯一ID
      text: inputText,
      completed: false
    };
    setTodos([...todos, newTodo]);
    setInputText(''); // 清空输入框
  };
  
  // 6. 事件处理：删除待办（子传父）
  const handleDeleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  // 7. 事件处理：切换待办状态（子传父）
  const handleToggleTodo = (id) => {
    setTodos(
      todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    // 8. Context.Provider：提供全局状态
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      <div style={{ 
        maxWidth: '600px', 
        margin: '0 auto', 
        padding: '20px',
        backgroundColor: isDark ? '#222' : '#f5f5f5',
        minHeight: '100vh'
      }}>
        <h1>React常用功能综合示例</h1>
        
        {/* 主题切换：条件渲染 + 状态管理 */}
        <div style={{ marginBottom: '20px' }}>
          <button 
            onClick={() => setIsDark(!isDark)}
            style={{ padding: '8px 16px', cursor: 'pointer' }}
          >
            切换{isDark ? '浅色' : '深色'}主题
          </button>
        </div>
        
        {/* 输入框：useRef + 事件处理 */}
        <div style={{ marginBottom: '20px' }}>
          <input
            ref={inputRef}
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="输入待办事项..."
            style={{ padding: '8px', width: '70%', marginRight: '10px' }}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()} // 回车添加
          />
          <button onClick={handleAddTodo} style={{ padding: '8px 16px' }}>
            添加待办
          </button>
        </div>
        
        {/* 列表渲染：map遍历 + 组件传参 */}
        <div>
          {todos.length === 0 ? (
            <p>暂无待办事项 🎉</p> // 条件渲染
          ) : (
            todos.map(todo => (
              <TodoItem
                key={todo.id} // 列表必须加key
                todo={todo}
                onDelete={handleDeleteTodo}
                onToggle={handleToggleTodo}
              />
            ))
          )}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;