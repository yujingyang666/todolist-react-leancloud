import React,{Component} from 'react'

export default class SignInform extends Component {
    render(){
        return(
    <form className="signIn" onSubmit={this.props.onSubmit}>
        <div className="row">
          <label>用户名</label>
          <input
            type="text"
            value={this.props.formData.username}
            onChange={this.props.onChange.bind(null, 'username')}/>
        </div>
        <div className="row">
          <label>密码</label>
          <input
             type="password"
            value={this.props.formData.password}
            onChange={this.props.onChange.bind(null, 'password')}/>
        </div>
        <div className="row actions">
          <button type="submit">登录</button>
          <a href="#" onClick={this.props.onShow}>忘记密码?</a>
        </div>
      </form>
        )
    }
}