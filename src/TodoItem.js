import React,{Component} from 'react';

class TodoItem extends Component {
    render (){
        return (
        <div>
            <input type="checkbox" 
            checked={this.props.todo.status==='completed'}
            onChange={this.toggle.bind(this)}/>
            {this.props.todo.title}
            <button onClick={this.del.bind(this)}>删除</button>
        </div>
        )
    }
    del(e){
        this.props.onDel(e,this.props.todo)
    }
    toggle(e){
        this.props.onToggle(e,this.props.todo)
    }
  
}

export default TodoItem;