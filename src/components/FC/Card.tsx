import z from "zod";


const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <div className="card">{children}</div>
}


const UsernameSchema = z.string().min(3, { message: "用户名至少 3 个字符" }).max(20, { message: "用户名最多 20 个字符" });

const validUsername = "zhangsan";
const invalidUsername = "zh";

const safeResult = UsernameSchema.safeParse(invalidUsername);
if (safeResult.success) {
  console.log("验证通过：", safeResult.data);
} else {
  console.log("验证失败：", safeResult.error.issues); // 输出错误详情数组
}

export default Card;