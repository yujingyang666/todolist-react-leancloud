import React, { Component } from 'react';
import './App.css';
import TodoInput from './TodoInput'
import TodoItem from './TodoItem'
import 'normalize.css'
import UserDialog from './UserDialog'
import {getCurrentUser,signOut} from './leanCloud'



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

  onSignUpOronSignIn(user){
     //this.state.user = user
     console.log(user)
     let stateCopy = JSON.parse(JSON.stringify(this.state))
     stateCopy.user = user
     this.setState(stateCopy)
  }



  signOut(){
    signOut()
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.user = {}  //登出后需要清除客户端界面数据
    this.setState(stateCopy)  
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
  }

  toggle(e,todo){
    if(todo.status!=='completed'){
      todo.status='completed'
    }else{todo.status=''}
    this.setState(this.state) 
   
  }
    
  del(e,todo){
    todo.deleted=true
    this.setState(this.state)
    
  }
}


// let id=0
// function idMarker(){
//   id ++
//   return id
// }

export default App;
