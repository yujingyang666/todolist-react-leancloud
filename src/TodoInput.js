import React,{Component} from 'react';

class TodoInput extends Component {
    render(){
        return <input type="text" placeholder="输入添加事项，按Enter保存"
                value={this.props.content} //5、App.js的content值改变，通过props传递改变value的值
                onChange={this.props.onChange} //1、用户输入内容时触发onChange，通过props传递执行App.js的onChange
                onKeyPress={this.enter.bind(this)}/>  //6、按回车触发onKeyPress执行enter()
    }
    enter(e){
        if(e.key ==='Enter'){
            this.props.onSub(e) //7、传递执行app.js的onSub
        }
    }
    // changeTitle(e){
    //     console.log('this:'+this)
    //     console.log('e'+e)
    //     this.props.onChange(e)
    // }
}

export default TodoInput;