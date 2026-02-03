// 先导入 React 相关依赖（tsx 文件规范，导入语句放在文件顶部）
import { useState } from "react";
import { z } from "zod";

// 1. 定义表单数据的 Zod Schema
const LoginFormSchema = z.object({
  // 邮箱：字符串，符合邮箱格式，必填
  email: z.string().email({ message: "请输入有效的邮箱地址" }),
  // 密码：字符串，最小长度 6，最大长度 32，必填
  password: z.string().min(6, { message: "密码至少 6 个字符" }).max(32, { message: "密码最多 32 个字符" }),
  // 记住我：可选布尔值，默认值 false（用 optional() 标记可选，default() 设置默认值）
  rememberMe: z.boolean().optional().default(false),
});

// 2. 自动推导 TypeScript 类型（无需手动写 interface ILoginForm {}）
type LoginFormValues = z.infer<typeof LoginFormSchema>;
// 此时 LoginFormValues = { email: string; password: string; rememberMe?: boolean | undefined }

// 3. React 组件（tsx 中直接导出，支持 JSX 语法返回）
export default function LoginForm() {
  // 初始化表单数据，类型自动推导
  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: "",
    password: "",
    rememberMe: false,
  });
  
  // 存储错误信息
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  // 表单提交处理
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 用 safeParse 验证表单数据（不抛出异常，适合表单场景）
    const result = LoginFormSchema.safeParse(formValues);
    if (!result.success) {
      // 格式化错误信息，映射到对应的表单字段
      const errors = result.error.issues.reduce((acc, issue) => {
        // issue.path[0] 对应表单字段名（email/password）
        acc[issue.path[0] as string] = issue.message;
        return acc;
      }, {} as Record<string, string>);
      setFormErrors(errors);
      return;
    }

    // 验证通过，处理后续登录逻辑（result.data 是合法且类型安全的数据）
    console.log("表单数据合法，开始登录：", result.data);
    setFormErrors({}); // 清空之前的错误信息
  };

  // 表单输入变更处理（兼容普通输入框和复选框）
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormValues((prev) => ({
      ...prev,
      // 复选框（rememberMe）取 checked 值，其他输入框取 value 值
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // tsx 中直接返回 JSX 元素（无需额外包装，符合 React 组件规范）
  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <div style={{ marginBottom: 10 }}>
        <label>邮箱：</label>
        <input
          type="email"
          name="email"
          value={formValues.email}
          onChange={handleInputChange}
          style={{ marginLeft: 10, padding: 4 }}
        />
        {formErrors.email && (
          <p style={{ color: "red", margin: 4, fontSize: 12 }}>{formErrors.email}</p>
        )}
      </div>
      <div style={{ marginBottom: 10 }}>
        <label>密码：</label>
        <input
          type="password"
          name="password"
          value={formValues.password}
          onChange={handleInputChange}
          style={{ marginLeft: 10, padding: 4 }}
        />
        {formErrors.password && (
          <p style={{ color: "red", margin: 4, fontSize: 12 }}>{formErrors.password}</p>
        )}
      </div>
      <div style={{ marginBottom: 10 }}>
        <input
          type="checkbox"
          name="rememberMe"
          checked={formValues.rememberMe}
          onChange={handleInputChange}
        />
        <label style={{ marginLeft: 6 }}>记住我</label>
      </div>
      <button type="submit" style={{ padding: 6, width: 100 }}>登录</button>
    </form>
  );
}