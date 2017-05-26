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
            <label><input type="radio" value="signUp" checked={this.state.selected === 'signUp'} onChange={this.ontab.bind(this)}/>
              注册</label>
            <label><input type="radio" value="signIn" checked={this.state.selected === 'signIn'} onChange={this.ontab.bind(this)}/>
              登录</label>
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