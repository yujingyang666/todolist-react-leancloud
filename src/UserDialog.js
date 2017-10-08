import React, {Component} from 'react';
import './UserDialog.css'
import {signUpApi, signInApi,sendPasswordResetEmail} from './leanCloud'
import {error} from './error'
import 'normalize.css'
import ForgotPassword from './forgotPassword'
import SignInOrSignUp from './signInOrSignUp'

class UserDialog extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedTab:'signInOrSignUp',
      formData: {
        email: '',
        username: '',
        password: ''
      }
    }
  }
 
  signUp(e) {
    e.preventDefault()
    let {email,username, password} = this.state.formData
    let success = (user) => {
      this.props.onSignUp(user,'SignUp')
    }

    signUpApi(email,username, password, success, error)
  }
  signIn(e) {
    e.preventDefault()
    let {username, password} = this.state.formData
    let success = (user) => {
      this.props.onSignIn(user,'SignIn')
    }

    signInApi(username, password, success, error)
  }
  changeFormData(key, e) {
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.formData[key] = e.target.value
    this.setState(stateCopy)
  }
 showForgotPassword(){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'forgotPassword'
    this.setState(stateCopy)
  }
  resetPassword(e){
    e.preventDefault()
    sendPasswordResetEmail(this.state.formData.email,error)
  }
  returnToSignIn(){
    let stateCopy = JSON.parse(JSON.stringify(this.state))
    stateCopy.selectedTab = 'signInOrSignUp'
    this.setState(stateCopy)
  }
  
  
  render() {
    return (
      <div className="UserDialog-Wrapper">
        <div className="UserDialog">
          {this.state.selectedTab === 'signInOrSignUp' ? <SignInOrSignUp 
          formData={this.state.formData}
          signUp={this.signUp.bind(this)}
          signIn={this.signIn.bind(this)}
          onChange={this.changeFormData.bind(this)}
          onShow={this.showForgotPassword.bind(this)}
          /> 
          : <ForgotPassword 
          formData={this.state.formData}
          onSubmit={this.resetPassword.bind(this)} 
          onChange={this.changeFormData.bind(this)} 
          toSignIn={this.returnToSignIn.bind(this)} />}
        </div>
      </div>
    )
  }
 
}

export default UserDialog