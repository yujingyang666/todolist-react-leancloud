import React, { Component } from 'react';
import './UserDialog.css'
import {signUpApi,signInApi} from './leanCloud'
import {error} from './error'

class UserDialog extends Component{

    constructor(props){
        super(props)
        this.state = {
        selected: 'signUp',
        formData: {
            username: '',
            password: ''
        }
      }
    }
    onChange(e){
      this.setState({
        selected: e.target.value
      })
    }
     signUp(e){
      e.preventDefault()
      console.log('注册了')
      let {username, password} = this.state.formData
      let success = (user)=>{
        this.props.onSignUp(user)
      }
      // let error = (error)=>{
      //   //alert(error.code)
      //   switch(error.code){
      //     case 202:
      //     alert('用户名已存在')
      //     break
      //     default:
      //     alert(error)
      //     break
      //   }
      // }
      signUpApi(username, password, success, error)
    }
    signIn(e){
      e.preventDefault()
      let {username, password} = this.state.formData
      let success = (user)=>{
        this.props.onSignIn(user)
      }
      // let error = (error)=>{
      //   //alert(error)
      //   switch(error.code){
      //     case 210:
      //     alert('用户名与密码不匹配')
      //     break
      //     case 211:
      //     alert('用户名不存在')
      //     break
      //     default:
      //     alert(error)
      //     break
      //   }
      // }
      signInApi(username, password, success, error)
    }
    changeFormData(key,e){
        let stateCopy = JSON.parse(JSON.stringify(this.state))
        stateCopy.formData[key] = e.target.value
        this.setState(stateCopy)    
    }
  
    render(){
        let signUpFrom = (
            <form className="signUp" onSubmit={this.signUp.bind(this)}> {/* 注册*/}
               <div className="row">
                 <label>用户名</label> 
                 <input type="text" value={this.state.formData.username}
                    onChange={this.changeFormData.bind(this,'username')}/>
               </div>
               <div className="row">
                 <label>密码</label>
                 <input type="password" value={this.state.formData.password}
                    onChange={this.changeFormData.bind(this,'password')}/>
               </div>
               <div className="row actions">
                 <button type="submit">注册</button>
               </div>
             </form>
        )
        let signInFrom = (
            <form className="signIn" onSubmit={this.signIn.bind(this)}> {/* 登录*/}
               <div className="row">
                 <label>用户名</label>
                 <input type="text" value={this.state.formData.username}
                    onChange={this.changeFormData.bind(this,'username')}/>
               </div>
               <div className="row">
                 <label>密码</label>
                 <input type="password" value={this.state.formData.password}
                    onChange={this.changeFormData.bind(this,'password')}/>
               </div>
               <div className="row actions">
                 <button type="submit">登录</button>
               </div>
             </form>
        )
     return (
       <div className="UserDialog-Wrapper">
         <div className="UserDialog">
             <nav >
              <label><input type="radio"  value="signUp" 
                      checked={this.state.selected === 'signUp'}
                      onChange={this.onChange.bind(this)}/> 注册</label>
              <label><input type="radio"  value="signIn" 
                      checked={this.state.selected === 'signIn'}
                      onChange={this.onChange.bind(this)}/> 登录</label>
           </nav>
           <div className="panes">
             {this.state.selected === 'signUp' ? signUpFrom:null}
             {this.state.selected === 'signIn' ? signInFrom:null}
           </div>
         </div>
       </div>
     )
   }
 }

 export default UserDialog