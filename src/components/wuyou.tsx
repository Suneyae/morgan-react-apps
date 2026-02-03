import { ChangeEvent, useEffect, useRef, useState } from "react"

function LastValue(){

    const handleChange = (e: ChangeEvent<HTMLInputElement>):void =>{
        setCurrValue(prevalue=>e.target.value)
    }
    const lastValueRef = useRef('')

    const [currValue, setCurrValue] = useState('')

    useEffect(() =>{
        lastValueRef.current = currValue
    },[currValue])

    return (
        <div>
            <p>last value is {lastValueRef.current}</p>
            <p> current value is {currValue}</p>
            <input placeholder="请输入" onChange={handleChange} ></input>
        </div>
    )
}


function LastValueCompare() {
  const [count, setCount] = useState(0);
  const lastCountRef = useRef(-3); // 持久化存储，不触发重渲染

  useEffect(() => {
    lastCountRef.current = count; // 这行代码在渲染后执行
  }, [count]); // 当 count 变化时触发

  return (
    <div>
      <p>当前值：{count}</p>
      <p>上一次值：{lastCountRef.current}</p>
      <button onClick={() => setCount(count + 1)}>点击+1</button>
    </div>
  );
}


export default function Counter() {
    const [count,setCount] = useState(0)
    const handleDecrement = () =>{
        setCount(count-1)
    }
    const handleIncrement = () =>{
        setCount(count+1)
    }



    const myRef = useRef(null)
    const handleClick = () =>{
            if(myRef.current){
                (myRef.current as HTMLInputElement).focus()
            }
    }
    
    return(
        <>  
            <h2>useState示例</h2>
            <div style={{padding:10}}>

                <button onClick={handleDecrement}>-</button>
                <span>{count>0?'+':''}{count}</span>
                <button onClick={handleIncrement}>+</button>
            </div>
            <h3>useRef示例 1</h3>
            <button onClick={handleClick}>set foucus</button>
            <input ref={myRef} />
            <h3>useRef示例 2</h3>
            <LastValueCompare />

            <h3>useRef示例 3</h3>
            <LastValue />

            
        </>
    )
}