import React,{Component} from 'react';

class TodoItem extends Component {
    render (){
        return (
        <div>
            
            <input type="checkbox" className="iconfont"
            checked={this.props.todo.status==='completed'}
            onChange={this.toggle.bind(this)}/>
            <input type="text"  
            value={this.props.todo.title} data-value={this.props.todo.title} onChange={this.props.onChange}
            onBlur={this.blur.bind(this)} onKeyPress={this.enter.bind(this)}/>
            <i className="iconfont icon-guanbi2fill" onClick={this.del.bind(this)}></i>
        </div>
        )
    }
    del(e){
        this.props.onDel(e,this.props.todo)
    }
    toggle(e){
        this.props.onToggle(e,this.props.todo)
    }
    blur(e){
        e.stopPropagation()
        this.props.onBlur(e)
    }
    enter(e){
        if(e.key ==='Enter'){
            e.target.blur()
        }
    }
}

export default TodoItem;