import React from 'react'
import Particles from 'react-particles-js'
import './ListItem.css'
import Note from './Note'
import {Modal, Button, Row, Col, Form } from 'react-bootstrap'
import ModalItem from './ModalItem'
import FlipMove from 'react-flip-move'

class ListItem extends React.Component{

    state = {

        todo:{},
        show: false,
        currentNoteID: "",
        alert:false
    }

    handleModal =(id) =>{
        this.setState({show:true});
        this.setCurrentId(id);      
    }

    setCurrentId = (id) => {
        this.setState({currentNoteID: id});
    }
    handleClose = () => { 
        this.setState({ show: false,alert:false });
        //console.log("show : " +this.props.show);
    }

    showAlert =() =>{
        this.setState({alert:true})
    }
    // handleSubmit = (e) =>{
    //     e.preventDefault()
    //     const noteId = document.getElementById("currentNoteId").innerHTML
    //     const todo = e.target.TodoName.value
    //     console.log(todo)
    //     fetch('http://localhost:8000/todo/' + noteId, {
    //     method:'PUT',
    //     headers:{'Content-Type' : 'application/json', 'Authorization' : 'sdfsfsfwiiowuerewrwrewrww'},
    //     body:JSON.stringify({
    //       todo:todo
    //     })
    //   }).then((result)=>console.log(result))
    // }


    render(){
        let i = 0;
        return <div>
            {this.props.items.map((item,index) => {
                i = i+ 1
                return(
                    <div key={index}>

                        <div className="list" key={item.noteid} >
                            <p id={"p" + 1} style={{
                                textDecoration: item.done === 1  ? 'line-through' : ""
                            }}  key={item.noteid} onClick={()=> this.props.toggleComplete(item) } > {item.todo}  </p>
                            <div className="icons">
                                
                                
                                <Button size="sm" onClick={()=> {let id; id = item.noteid;this.handleModal(id) }} id={item.noteid} >Edit</Button>
                                
                                <ModalItem editItem={this.props.editItem} showAlert={this.showAlert} alert={this.state.alert} show = {this.state.show} itemid={this.state.currentNoteID} handleClose = {this.handleClose} editItem={this.props.editItem} />
                                
                                <img onClick={()=> this.props.deleteItem(item.noteid)} src="https://img.icons8.com/wired/64/000000/empty-trash.png" height="20" />
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
        
    }
}

export default ListItem