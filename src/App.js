import React,{useEffect,useState} from 'react'

import { DataVPreview,DataVEditor } from 'smart-datav-npm'
import 'antd/dist/antd.css'
import 'smart-datav-npm/dist/index.css'
import axios from "axios"
import { Modal } from 'antd'

const App = () => {
  const [editorData,setEditorData] = useState(undefined)
  const preInstallBgImages = [
    {key:1,img:''},
    {key:2,img:''},
    {key:3,img:''}
  ]
  const industrialLibrary = [
    {
      type:'mk',
      name:'灯光',
      images:[
        {name:"1",url:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",width:100,height:100,type:'image',key:'1'},
        {name:"2",url:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",width:100,height:100,type:'image',key:'2'},
      ]
    },
    {
      type:'mj',
      name:'管道',
      images:[
        {name:"3",url:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",width:100,height:100,type:'image',key:'3'},
        {name:"4",url:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",width:100,height:100,type:'image',key:'4'},
      ]
    }
  ]
  const selfIndustrialLibrary = [
    {name:"9",url:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",width:100,height:100,type:'image',key:'8'},
    {name:"10",url:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",width:100,height:100,type:'image',key:'9'},
  ]
  const uploadConfig = {
    baseURL:"http://192.168.3.42:50010",
    self:{
      baseURL:"http://192.168.3.42:50010",
      token:"development_of_special_token_by_star_quest",
      url:"/api/file/file/uploadReturnPath",
      data:{
        mappingId:"ooip6ffe388d487db754b885b8aa65b9",
        mappingType:"106"
      }
    },
    preInstall:{
      baseURL:"http://192.168.3.42:50010",
      token:"development_of_special_token_by_star_quest",
      url:"/api/file/file/uploadReturnPath",
      data:{
        mappingId:"ooip6ffe388d487db754b885b8aa65b9",
        mappingType:"107"
      }
    }
  }
  useEffect( ()=>{
    // 获取数据
    const formData = new FormData()
    formData.append("mappingId","23233")
    formData.append("mappingType","107")
    const instance = axios.create({
      baseURL:'http://192.168.3.42:50010',
      timeout:10000000,
      maxContentLength:1000000000
    });
    // 获取面板数据
    instance.get("/api/applications/newBoard/detail",{
      method:'get',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'token':'development_of_special_token_by_star_quest',
        'Content-Type':'application/json'
      },
      params: {
        id: '1a99aa5c58144a7b8ce8230ace2c53b6'
      }
    }).then((res)=>{
      console.log("detail",res)
      if(res.data?.data?.property){
        if(res.data.data.property!=null&&res.data.data.property!=null){
          const getEditorData = JSON.parse(decodeURIComponent(escape(window.atob(res.data.data.property))));
          setEditorData(getEditorData)
        }
      }
      console.log(JSON.parse(decodeURIComponent(escape(window.atob(res.data.data.property)))))
    })
    // 获取获取当前租户下 上传的背景图片
    instance.post("/api/applications/custom/component/componentList",{mappingType:"107"},{
      method:'post',
      headers: {
        'token':'development_of_special_token_by_star_quest',
        'Content-Type':'application/json'
      }
    }).then((res)=>{
      console.log("背景图片=",res)
    })
    // 获取获取当前租户下 指定自定义组件图片列表
    instance.post("/api/applications/custom/component/componentList",{mappingType:"106"},{
      method:'post',
      headers: {
        'token':'development_of_special_token_by_star_quest',
        'Content-Type':'application/json'
      }
    }).then((res)=>{
      console.log("组件图片列表=",res);
      (res.data.data||[]).map((image)=>{
        const newImg = {
          ...image,
          width:100,height:100,type:'image',key:image.id
        }
        selfIndustrialLibrary.push(newImg)
        return null;
      })
    })
  },[])
  // 保存数据到数据库
  const handleSaveEditorData = (data)=>{
    console.log(data)
    const instance = axios.create({
      baseURL:'http://192.168.3.42:50010',
      timeout:10000000,
      maxContentLength:1000000000
    })
    instance.post("/api/applications/newBoard/updateProperty",{
      "id":"1a99aa5c58144a7b8ce8230ace2c53b6",
      "property":window.btoa(unescape(encodeURIComponent(JSON.stringify(data))))
    },{
      method:'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'token':'development_of_special_token_by_star_quest',
        'Content-Type':'application/json;charset=UTF-8'
      }
    }).then((res)=>{
      console.log("update==",res)
    })
  }
  // 自定义预览，多数为打开一个新页面，路由，内置的预览是弹窗
  const handlePreview = (data)=>{
    console.log(data)
  }
  const renderExtraModel = ()=>{
    return (
      <Modal
        title="预览"
        className="preview-modal"
        visible={true}
        onOk={handlePreview}
        onCancel={handlePreview}
        okText="确认"
        cancelText="取消"
      >
        <div>ssssss</div>
      </Modal>
    )
  }
  return (
    <React.Fragment>
      <DataVEditor
        onEditorSaveCb={handleSaveEditorData}
        editorData={editorData}
        extraSetting={renderExtraModel}
        selfIndustrialLibrary={selfIndustrialLibrary}
        industrialLibrary={industrialLibrary}
        uploadConfig={uploadConfig}
        preInstallBgImages={preInstallBgImages}
      />
      {/*<DataVPreview editorData={editorData}/>*/}
    </React.Fragment>
  )
}

export default App
