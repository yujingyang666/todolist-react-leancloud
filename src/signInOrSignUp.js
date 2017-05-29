import React, {Component} from 'react'
import SignUpform from './signUpForm'
import SignInform from './signInForm'

export default class SignInOrSignUp extends Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: 'signIn'
        }
    }

    ontab(e) {
        this.setState({
            selected: e.target.value
        })
    }
    render() {
        return (
            <div className="signInOrSignUp">
          <nav >
            <input type="radio" id="signUp" value="signUp" checked={this.state.selected === 'signUp'} onChange={this.ontab.bind(this)}/>
              <label htmlFor="signUp"><i className="iconfont icon-addpeople_fill"></i>注册</label>
            <input type="radio" id="signIn" value="signIn" checked={this.state.selected === 'signIn'} onChange={this.ontab.bind(this)}/>
              <label htmlFor="signIn"><i className="iconfont icon-addressbook_fill"></i>登录</label>
          </nav>
          <div className="panes">
            {this.state.selected === 'signUp' ? 
            <SignUpform formData={this.props.formData} onSubmit={this.props.signUp} onChange={this.props.onChange} />: null}
            {this.state.selected === 'signIn' ? 
            <SignInform formData={this.props.formData} onSubmit={this.props.signIn} onChange={this.props.onChange} onShow={this.props.onShow} />: null} 
        </div>
      </div>
        )

    }

}