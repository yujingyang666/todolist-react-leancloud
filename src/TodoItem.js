import React,{Component} from 'react';

class TodoItem extends Component {
    render (){
        return (
        <div>
            <input type="checkbox" 
            checked={this.props.todo.status==='completed'}
            onChange={this.toggle.bind(this)}/>
            <input type="text" 
            value={this.props.todo.title} data-value={this.props.todo.title} onChange={this.props.onChange}/>
            {/*onKeyPress={this.enter.bind(this)}*/}
            
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
    // enter(e){
    //     if(e.key ==='Enter'){
    //         this.props.Enter(e) 
    //     }
    // }
  
}

export default TodoItem;