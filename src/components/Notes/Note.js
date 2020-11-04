import React from 'react';
import ListItem from './ListItem';
import './Note.css'
class Note extends React.Component {
    state={
        items:[],
        currentItem:{
            todo:'',
            key:''
        }
    }

    handleInput = (e) => {
        console.log(e)
        this.setState({
            currentItem:{
                todo:e.target.value,
                key:Date.now()
            }
        })
        
    }

    submitForm = (e) => {
        e.preventDefault()
        this.props.addItem(this.state.currentItem,this.props.info.id) 
        this.setState({
            currentItem:{
                todo:"",
                key:''
            }
        })
   
    }
    
    render(){

        return(
            <div className="form">
                <header>
                    {/* <div>{this.props.info.id}</div> */}
                    <form id="to-do-form" onSubmit={this.submitForm}>
                        <input 
                            type="text" 
                            placeholder="Enter Text" 
                            value={this.state.currentItem.todo}
                            onChange={this.handleInput}
                            maxLength="15"
                        />
                        <button type="submit">Add</button>
                    </form>
                </header>
                <ListItem currentItem={this.state.currentItem} toggleComplete={this.props.toggleComplete} editItem={this.props.editItem} items={this.props.items} deleteItem={this.props.deleteItem}/>
            </div>
            
        )
    }
}

export default Note