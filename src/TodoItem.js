import React,{Component} from 'react';

class TodoItem extends Component {
    render (){
        return (
        <div>
            <label className="iconfont">
            <input type="checkbox" 
            checked={this.props.todo.status==='completed'}
            onChange={this.toggle.bind(this)}/></label>
            <input type="text" 
            value={this.props.todo.title} data-value={this.props.todo.title} onChange={this.props.onChange}/>
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
    // enter(e){
    //     if(e.key ==='Enter'){
    //         this.props.Enter(e) 
    //     }
    // }
  
}

export default TodoItem;