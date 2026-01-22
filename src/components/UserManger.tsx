import { useState, useEffect, useRef, useCallback } from 'react';

// 定义Props类型
interface UserManagerProps {
  initialUsers?: { id: number; name: string; age: number }[];
  title?: string;
}

// 核心组件：带美观样式的用户管理组件
const UserManager: React.FC<UserManagerProps> = ({
  initialUsers = [{ id: 1, name: 'Morgan', age: 25 }],
  title = '用户信息管理'
}) => {
  // 状态管理
  const [users, setUsers] = useState(initialUsers);
  const [inputName, setInputName] = useState('');
  const [inputAge, setInputAge] = useState('');
  const [showAgeFilter, setShowAgeFilter] = useState(false);
  const [filteredAge, setFilteredAge] = useState(18);
  const [isLoading, setIsLoading] = useState(true);

  // Ref使用
  const inputNameRef = useRef<HTMLInputElement>(null);
  const lastUpdateTime = useRef<Date | null>(null);

  // 副作用处理
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      lastUpdateTime.current = new Date();
    }, 1000);

    console.log('用户列表更新：', users);

    return () => clearTimeout(timer);
  }, [users]);

  // 添加用户函数
  const addUser = useCallback(() => {
    if (!inputName || !inputAge) return alert('姓名/年龄不能为空');
    const newUser = {
      id: Date.now(),
      name: inputName,
      age: Number(inputAge)
    };
    setUsers([...users, newUser]);
    setInputName('');
    setInputAge('');
    inputNameRef.current?.focus();
  }, [inputName, inputAge, users]);

  // 删除用户函数
  const deleteUser = (id: number) => {
    setUsers(users.filter(user => user.id !== id));
  };

  // 列表过滤
  const filteredUsers = showAgeFilter 
    ? users.filter(user => user.age >= filteredAge) 
    : users;

  // 加载状态
  if (isLoading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.loadingSpinner}></div>
        <p style={styles.loadingText}>加载中...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* 标题区域 */}
      <div style={styles.header}>
        <h2 style={styles.title}>{title}</h2>
        <p style={styles.updateTime}>
          最后更新：{lastUpdateTime.current?.toLocaleString() || '暂无'}
        </p>
      </div>

      {/* 表单区域 */}
      <div style={styles.formContainer}>
        <input
          ref={inputNameRef}
          type="text"
          placeholder="请输入姓名"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          style={styles.input}
        />
        <input
          type="number"
          placeholder="请输入年龄"
          value={inputAge}
          onChange={(e) => setInputAge(e.target.value)}
          style={styles.input}
        />
        <button onClick={addUser} style={styles.addButton}>
          添加用户
        </button>
      </div>

      {/* 筛选区域 */}
      <div style={styles.filterContainer}>
        <label style={styles.filterLabel}>
          <input
            type="checkbox"
            checked={showAgeFilter}
            onChange={(e) => setShowAgeFilter(e.target.checked)}
            style={styles.checkbox}
          />
          筛选：仅显示年龄 ≥ 
          {showAgeFilter && (
            <input
              type="number"
              value={filteredAge}
              onChange={(e) => setFilteredAge(Number(e.target.value))}
              style={styles.filterInput}
            />
          )}
          {!showAgeFilter && <span style={styles.filterPlaceholder}>18</span>}
          岁的用户
        </label>
      </div>

      {/* 用户列表区域 */}
      <div style={styles.listContainer}>
        {filteredUsers.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyText}>暂无用户数据 📭</p>
          </div>
        ) : (
          <ul style={styles.userList}>
            {filteredUsers.map((user) => (
              <li key={user.id} style={styles.userItem}>
                <div style={styles.userInfo}>
                  <span style={styles.userName}>{user.name}</span>
                  <span style={styles.userAge}>{user.age} 岁</span>
                </div>
                <button 
                  onClick={() => deleteUser(user.id)} 
                  style={styles.deleteButton}
                >
                  删除
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

// 样式对象（集中管理，便于维护）
const styles = {
  // 整体容器
  container: {
    maxWidth: 700,
    margin: '20px auto',
    padding: '24px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
    backgroundColor: '#ffffff',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  // 标题区域
  header: {
    marginBottom: '24px',
    borderBottom: '1px solid #f0f0f0',
    paddingBottom: '16px',
  },
  title: {
    margin: 0,
    fontSize: '20px',
    fontWeight: 600,
    color: '#1f2937',
  },
  updateTime: {
    marginTop: '8px',
    fontSize: '14px',
    color: '#6b7280',
    marginBottom: 0,
  },
  // 表单容器
  formContainer: {
    display: 'flex',
    gap: '12px',
    marginBottom: '20px',
    flexWrap: 'wrap',
  },
  // 输入框
  input: {
    flex: 1,
    minWidth: '180px',
    padding: '10px 12px',
    borderRadius: '8px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
    transition: 'border-color 0.2s ease',
    outline: 'none',
  },
  // 输入框聚焦样式
  inputFocus: {
    borderColor: '#3b82f6',
    boxShadow: '0 0 0 2px rgba(59, 130, 246, 0.1)',
  },
  // 添加按钮
  addButton: {
    padding: '10px 20px',
    borderRadius: '8px',
    backgroundColor: '#3b82f6',
    color: '#ffffff',
    border: 'none',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    whiteSpace: 'nowrap',
  },
  addButtonHover: {
    backgroundColor: '#2563eb',
  },
  // 筛选容器
  filterContainer: {
    marginBottom: '24px',
    padding: '12px 16px',
    borderRadius: '8px',
    backgroundColor: '#f9fafb',
  },
  filterLabel: {
    fontSize: '14px',
    color: '#374151',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  checkbox: {
    width: '16px',
    height: '16px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  filterInput: {
    width: '60px',
    padding: '4px 8px',
    borderRadius: '4px',
    border: '1px solid #d1d5db',
    fontSize: '14px',
  },
  filterPlaceholder: {
    width: '60px',
    display: 'inline-block',
    color: '#9ca3af',
  },
  // 列表容器
  listContainer: {
    marginTop: '8px',
  },
  // 用户列表
  userList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  // 用户项
  userItem: {
    padding: '16px',
    borderRadius: '8px',
    border: '1px solid #e5e7eb',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'box-shadow 0.2s ease',
  },
  userItemHover: {
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
  },
  // 用户信息
  userInfo: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center',
  },
  userName: {
    fontSize: '15px',
    fontWeight: 500,
    color: '#1f2937',
  },
  userAge: {
    fontSize: '14px',
    color: '#6b7280',
    backgroundColor: '#f3f4f6',
    padding: '2px 8px',
    borderRadius: '12px',
  },
  // 删除按钮
  deleteButton: {
    padding: '6px 12px',
    borderRadius: '6px',
    backgroundColor: '#fef2f2',
    color: '#dc2626',
    border: '1px solid #fee2e2',
    fontSize: '13px',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  deleteButtonHover: {
    backgroundColor: '#fee2e2',
  },
  // 空状态
  emptyState: {
    padding: '40px 20px',
    textAlign: 'center',
    borderRadius: '8px',
    backgroundColor: '#f9fafb',
    border: '1px dashed #d1d5db',
  },
  emptyText: {
    fontSize: '15px',
    color: '#6b7280',
    margin: 0,
  },
  // 加载状态
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 20px',
    gap: '16px',
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #f3f4f6',
    borderTop: '4px solid #3b82f6',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  loadingText: {
    fontSize: '14px',
    color: '#6b7280',
  },
} as const;

// 全局动画（需注入到组件外层）
const StyleSheet = () => (
  <style>
    {`
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      input:focus {
        border-color: #3b82f6 !important;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1) !important;
      }
      button:hover {
        opacity: 0.95;
      }
      .add-button:hover {
        background-color: #2563eb !important;
      }
      .delete-button:hover {
        background-color: #fee2e2 !important;
      }
      .user-item:hover {
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06) !important;
      }
    `}
  </style>
);
export default UserManager;
export { StyleSheet };

