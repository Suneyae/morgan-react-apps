import Popup2 from 'components/Popup2';
import './App.css';
import { GetApiData } from 'components/GetApiData';
import UserManager from 'components/UserManger';

const header = [
  {title: 'Name'},
  {title: 'Age'},
  {title: 'Occupation'},
];

const data = [
  {name: 'Alice', age: 30, occupation: 'Engineer'},
  {name: 'Bob', age: 25, occupation: 'Designer'},
  {name: 'Charlie', age: 35, occupation: 'Teacher'},
];

function App() {
  const url = "https://jsonplaceholder.typicode.com/posts";

  return(
    <>
        {/* <Popup></Popup> */}
        <Popup2 tableHeader={header} tableData={data} ></Popup2>
        {/* <GetApiData2 url={url}/> */}
        <GetApiData url={url} />    
        <UserManager title="我的用户管理系统" />
    </>
  )
}

export default App;