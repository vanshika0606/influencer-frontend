
import { useState } from 'react';
import './App.css';

import Add from './components/Form'
import Update from './components/Form'
import Lists from './components/Lists';

import './components/style.css'

function App() {

  const [list , setList]= useState([])
  const [view, setView]= useState(false)
  const[del, setDel]= useState(0)
  const[update, setUpdate]= useState(false)
  const [id, setId]= useState("")
  const [updateData, setUpdateData]= useState({
    name:"",
    social_media:'',
    follower_No:""
  })

  const [influencer, setInfluencer] = useState({
    name:"",
    social_media:"",
    follower_No:""
})



   
  return (
    <div className="back">
       {view==false ?
       <Add 
       setList={setList}  
       setView={setView} 
       del={del}
       update={update}
       url="add"
       method="POST"
       influencer={influencer}
       setInfluencer={setInfluencer}
       submitButton="Add Influencer"
       />  :
       (
        !update && <Lists list={list} del={del} setDel={setDel} setList={setList} setView={setView}
       setUpdate={setUpdate}
       update={update}
       setUpdateData={setUpdateData}
       setId={setId}/>)
       }

       {update && <Update
       update={update}
       influencer={updateData}
       setInfluencer={setUpdateData}
       setUpdate={setUpdate}
       submitButton="Update Influencer"
       method="PUT"
       url={`update/${id}`}
       />}
       
    </div>
  );
}

export default App;
