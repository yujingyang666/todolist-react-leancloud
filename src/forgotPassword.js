import React,{Component} from 'react'

export default class ForgotPassword extends Component {
    render(){
        return(
        <div className="forgotPassword">
         <nav >
           <label ><i className="iconfont icon-unlock_fill"></i>重置密码</label>
         </nav>
          <div className="panes">
         <form className="forgotPassword" onSubmit={this.props.onSubmit}> 
          
           <div className="row">
             <label><i className="iconfont icon-mail_fill"></i>邮箱</label>
             <input type="text" placeholder="E-mail" value={this.props.formData.email}
               onChange={this.props.onChange.bind(null, 'email')}/>  
           </div>
           <div className="row actions">
             <button type="submit">发送重置邮件</button>
             <a href="#" onClick={this.props.toSignIn}>返回登录</a>
           </div>
           
         </form>
         </div>
       </div>

        )

    }

}