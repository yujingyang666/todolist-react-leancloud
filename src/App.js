import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import UserDialog from './UserDialog'
import AV,{getCurrentUser,signOut} from './leanCloud'


class App extends Component {
  constructor(props){
     super(props)
     this.state = {
       user: getCurrentUser() || {},
       newTodo:'',
       todoList:[]
     }
  }
  render() {
    let todos=this.state.todoList.filter((item)=>!item.deleted).map((item,index)=>{  //把标记为删除的list筛选掉，剩下的给todos,箭头函数里this值为外面传入值，不用hackthis
        return (
            <li key={index}> 
            <TodoItem todo={item}
            onToggle={this.toggle.bind(this)}
            onDel={this.del.bind(this)}/>
            </li>
      )
    })
    return (
      <div className="App">
        <h1>{this.state.user.username || '我'}的待办
          {this.state.user.id ? <button onClick={this.signOut.bind(this)}>登出</button> : null}
        </h1>
        <div className='inputWrapper'>
          <TodoInput 
          content={this.state.newTodo}  //4、newTodo的值改变从而改变content的值
          onChange={this.changeTitle.bind(this)} //2、TodoInput的onChange触发时传递执行这里的onChange里的值
          onSub={this.addTodo.bind(this)} />
        </div>
        <ul className='lists'>
          {todos}
        </ul>
        {this.state.user.id ? null : <UserDialog onSignUp={this.onSignUpOronSignIn.bind(this)} onSignIn={this.onSignUpOronSignIn.bind(this)}/> }
      </div>
    )
  }

  onSignUpOronSignIn(user){   //注册或登录后更新本地用户信息、数据
     //this.state.user = user
     console.log('onSignUpOronSignIn:'+user)
     let stateCopy = JSON.parse(JSON.stringify(this.state))
     stateCopy.user = user
     this.setState(stateCopy)
     this.fetchTodos()
  }



  signOut(){
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}
    stateCopy.todoList =[]  //登出后需要清除客户端界面数据
    this.setState(stateCopy) 
  }
  componentWillMount(){
    this.fetchTodos()
  }
  componentDidUpdate(){
    
  }

  changeTitle(e){
        this.setState({
          newTodo:e.target.value  //3、执行onChange改变newTodo的值
          // todoList:this.state.todoList
        })
        // console.log(this.state.todoList)
  }

   addTodo(e){  //8、onSub触发时，执行
    if(e.target.value.length>0){
      this.state.todoList.push({
        // id:idMarker(), 
        title:e.target.value,
        status:null,
        deleted:false
      })
      this.setState({
        newTodo:'',  //把newTodo清零  newTodo -> TodoInput content -> TodoInput.js的value
        todoList:this.state.todoList
      })
    }
    this.saveOrUpdateTodos()
  }

  toggle(e,todo){
    if(todo.status!=='completed'){
      todo.status='completed'
    }else{todo.status=''}
    this.setState(this.state) 
   this.saveOrUpdateTodos()
  }
    
  del(e,todo){
    todo.deleted=true
    this.setState(this.state)
    this.saveOrUpdateTodos()
  }

   //保存数据
  saveTodos(){
    let dataString = JSON.stringify(this.state.todoList)
    var  AVTodos = AV.Object.extend('AllTodos');
    var avTodos = new AVTodos();
    var acl = new AV.ACL();
    acl.setReadAccess(AV.User.current(),true)
    acl.setWriteAccess(AV.User.current(),true)
    avTodos.set('content',dataString);
    avTodos.setACL(acl)//设置访问控制
    avTodos.save().then((todo)=>{
      let stateCopy = JSON.parse(JSON.stringify(this.state))
      stateCopy.todoList.id = todo.id 
      this.setState(stateCopy)
      console.log('保存成功');
    },function(error){
      alert('保存失败')
    })
  }

 //更新数据
  updataTodos(){
      let dataString = JSON.stringify(this.state.todoList)
      let avTodos = AV.Object.createWithoutData('AllTodos',this.state.todoList.id)
      avTodos.set('content',dataString)
      avTodos.save().then(()=>{
        console.log('更新成功')
      })
    }
//更新或者保存数据，分别在数据发生改变时调用，数据存在就更新，数据不存在就保存
  saveOrUpdateTodos(){
    if(this.state.todoList.id){
      this.updataTodos()
    }else{
      this.saveTodos()
    }
  }
//查询当前用户是否存在于leancloud，存在则获取保存的数据内容
fetchTodos(){
  console.log(this.state)
    if(this.state.user){
    var query = new AV.Query('AllTodos');
    query.find()
      .then((todos)=>{
        let avAlltodos = todos[0]
        let id = avAlltodos.id
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.todoList = JSON.parse(avAlltodos.attributes.content)
        stateCopy.todoList.id = id 
        this.setState(stateCopy)
      },function(error){
        console.error(error)
      })
    }
  }
}


export default App;
