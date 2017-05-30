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
            placeholder="请输入正确的邮箱"
            value={this.props.formData.email}
            onChange={this.props.onChange.bind(null, 'email')}/>
            <span className="bar"/>
        </div>
        <div className="row">
          <label><i className="iconfont icon-wode"></i>用户名</label>
          <input
            type="text"
            placeholder="请输入长度大于3的用户名"
            value={this.props.formData.username}
            onChange={this.props.onChange.bind(null, 'username')}/>
            <span className="bar"/>
        </div>
        <div className="row">
          <label><i className="iconfont icon-unlock"></i>密码</label>
          <input
            type="password"
            placeholder="请输入6位以上的密码"
            value={this.props.formData.password}
            onChange={this.props.onChange.bind(null, 'password')}/>
            <span className="bar"/>
        </div>
        <div className="row actions">
          <button type="submit">注册</button>
        </div>
      </form>
        )
    }
}