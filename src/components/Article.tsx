import { useState, ReactNode } from "react";

// 1. 修正命名错误 + 增强类型注释 + 统一命名规范
interface CommentProps {
  /** 评论内容 */
  content?: string;
  /** 评论点赞数（修正拼写错误：comentNum -> commentNum） */
  commentNum: number;
  /** 点赞回调函数 */
  onLike?: () => void; // 语义更清晰：onComment -> onLike
}

/** 评论组件 - 展示评论内容和点赞功能 */
const Comment = ({ content, commentNum, onLike }: CommentProps) => {
  // 2. 空值处理：避免content为undefined时显示空内容
  const displayContent = content || "暂无评论内容";

  return (
    <div style={{ 
      backgroundColor: '#f0f0f0', // 浅灰色更友好，替代深grey
      padding: '12px',
      borderRadius: '8px',
      marginTop: '8px'
    }}>
      <p style={{ fontWeight: 'bold', margin: '0 0 8px 0' }}>评论内容：</p>
      <div>{displayContent}</div>
      {/* 3. 按钮样式优化 + 显示点赞数 */}
      {onLike && (
        <button 
          onClick={onLike}
          style={{ 
            marginTop: '8px',
            padding: '4px 12px',
            cursor: 'pointer',
            border: '1px solid #ccc',
            borderRadius: '4px',
            backgroundColor: 'white'
          }}
        >
          点赞 ({commentNum})
        </button>
      )}
    </div>
  );
};

// 4. 增强ArticleProps类型 + 补充注释
interface ArticleProps {
  /** 文章子元素 */
  children?: ReactNode;
  /** 文章标题 */
  title?: string;
  /** 文章详情/摘要 */
  detail?: string;
  /** 文章评论内容 */
  comments?: string;
}

/** 文章组件 - 展示标题、详情、评论及点赞功能 */
const Article = ({ children, title, detail, comments }: ArticleProps) => {
  // 5. 状态命名规范（小驼峰）+ 函数式更新（避免闭包陷阱）
  const [commentNum, setCommentNum] = useState<number>(0);

  // 6. 抽离点赞逻辑为独立函数，增强可读性
  const handleLike = () => {
    // 函数式更新：确保拿到最新的state值
    setCommentNum(prevNum => prevNum + 1);
  };

  // 7. 空值处理：标题/详情默认值
  const displayTitle = title || "未命名文章";
  const displayDetail = detail || "暂无文章详情";

  return (
    <div style={{ padding: '16px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ margin: '0 0 8px 0' }}>
        {displayTitle} 
        {/* 8. 点赞数展示优化：括号包裹更美观 */}
        <span style={{ fontSize: '16px', marginLeft: '8px', color: '#666' }}>
          ({commentNum}赞)
        </span>
      </h2>
      <strong style={{ display: 'block', marginBottom: '8px' }}>{displayDetail}</strong>
      <Comment 
        content={comments} 
        commentNum={commentNum} 
        onLike={handleLike} 
      />
      {/* 9. 子元素容器包裹 + 间距 */}
      <div style={{ marginTop: '16px' }}>
        {children}
      </div>
    </div>
  );
};

export default Article;