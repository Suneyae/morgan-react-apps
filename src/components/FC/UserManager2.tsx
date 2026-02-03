import { useState } from "react";

interface Usermanager2Props {
    initialUsers: { id: number; name: string; age: number }[];
    title?: string;
}
const Usermanager2: React.FC<Usermanager2Props> = ({ title,initialUsers }) => {

    
    const [userValue,setUserValue] = useState(initialUsers);
    const [userName,setUserName] = useState('');
    const [userAge,setUserAge] = useState('');
    const addUser = () =>{
        if(!userName||!userAge){
            alert('请输入完整的姓名和年龄');
            return;
        }
        setUserValue([...userValue,{id:userValue.length>0?Math.max(...userValue.map(u => u.id))+1:1,name:userName,age:Number(userAge)}]);
        setUserAge('');
        setUserName('');
    }
    const handleDelete = (id:number) => {
        const currUser = userValue.filter(user => user.id !== id);
        setUserValue(currUser);
    }
    return (
        <>  
            <div style={{border:"1px solid #e0e0e0"}}>
            <h1>{title}</h1>
            <input placeholder="请输入姓名" value={userName} onChange={ (e) => setUserName(e.target.value)}></input>
            <input placeholder="请输入年龄" value={userAge} type="number" min={0} max={10} onChange={(e) => setUserAge(e.target.value) }></input> 
            <button onClick={addUser}>添加用户</button>
            {
                Array.isArray(userValue)
                ?userValue?.map(user =>(
                    <div>
                    <strong>{user.name} </strong> <span>{user.age}岁</span><button onClick={ ()=>handleDelete(user.id)}>删除</button>
                    </div>
                ))
                :<div></div>
            }
            </div>
        </>

    )
}

export default Usermanager2;