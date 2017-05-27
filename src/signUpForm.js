import React,{Component} from 'react'

export default class SignUpform extends Component {
    render(){
        return(
            <form className="signUp" onSubmit={this.props.onSubmit}>
        {/* 注册*/}
        <div className="row">
           <label><i className="iconfont icon-mail_fill"></i>邮箱</label>
          <input
            type="text"
            value={this.props.formData.email}
            onChange={this.props.onChange.bind(null, 'email')}/>
        </div>
        <div className="row">
          <label><i className="iconfont icon-wode"></i>用户名</label>
          <input
            type="text"
            value={this.props.formData.username}
            onChange={this.props.onChange.bind(null, 'username')}/>
        </div>
        <div className="row">
          <label><i className="iconfont icon-unlock"></i>密码</label>
          <input
            type="password"
            value={this.props.formData.password}
            onChange={this.props.onChange.bind(null, 'password')}/>
        </div>
        <div className="row actions">
          <button type="submit">注册</button>
        </div>
      </form>
        )
    }
}