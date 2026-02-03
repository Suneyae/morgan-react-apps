import Popup2 from 'components/Popup2';
import './App.css';
import { GetApiData } from 'components/GetApiData';
import UserManager from 'components/UserManger';
import Card from 'components/FC/Card';
import Usermanager2 from 'components/FC/UserManager2';
import LoginForm from 'components/FC/LoginForm';
import logo from './logo.svg'
import Article from 'components/Article';
import Counter from 'components/wuyou';
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

const articleDetail = {
  body: "乌克兰危机是指自2014年以来乌克兰境内发生的一系列政治、军事和社会事件。这场危机始于乌克兰政府决定暂停与欧盟签署联系国协定，转而寻求与俄罗斯建立更紧密的关系。这一决定引发了大规模的抗议活动，最终导致时任总统亚努科维奇被推翻。随后，俄罗斯吞并了克里米亚半岛，并支持乌克兰东部的亲俄分离主义势力，导致该地区爆发武装冲突。乌克兰危机不仅对乌克兰国内局势产生了深远影响，也引发了国际社会的广泛关注和制裁措施。"
}
function App() {
  const url = "https://jsonplaceholder.typicode.com/posts";

  return(
    <>
        {/* <Popup></Popup> */}
        <Popup2 tableHeader={header} tableData={data} ></Popup2>
        {/* <GetApiData2 url={url}/> */}
        <GetApiData url={url} />    
        <UserManager title="我的用户管理系统" />

        {/* <Card children={<p>这是卡片</p>}></Card> */}
        {/* <Usermanager2 title='user management component 2' initialUsers={[{ id: 12, name: 'Alice', age: 30 }]}></Usermanager2> */}
        <LoginForm />

        <Article title="乌克兰危机" detail={articleDetail.body} comments="乌克兰活该被侵略吗？">
          <p>这是文章的子内容，可以是任意 React 节点。</p>
        </Article>

        <Counter />
    </>
  )
}

export default App;