import React from 'react';
import logo from './logo.svg';
import './App.css';
import { DataVEditor } from 'smart-datav-npm'
import 'antd/dist/antd.css'
import 'smart-datav-npm/dist/index.css'

function App() {
  const handleSaveEditorData = (data:any)=>{
    console.log(data)
  }
  return (
    <div className="App">
      <header style={{height:50,width:'100%',background:'red'}}>header</header>
      <div style={{width:'10%',height:'100vh',float:'left'}}>left</div>
      <div style={{width:'89%',height:'100vh',float:'right'}}>
        <DataVEditor  onEditorSaveCb={handleSaveEditorData}/>
      </div>

    </div>
  );
}

export default App;
