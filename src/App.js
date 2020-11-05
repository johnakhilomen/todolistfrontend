import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Signin from './components/Signin/Signin';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Register from './components/Register/Register'
import Note from './components/Notes/Note'

const particlesOption={
  particles:{
    polygon: {
      enable: true,
      type: 'inside',
      move: {
          radius: 10
      }
    }
  }
}




class App extends Component {

  state = {
    route:'signin',
    isSignedIn: false,
    
    user:{
      id:'',
      name:'',
      email:''
    }, 
    currentItem:{
      text:'',
      key:''
    },
    items:[]

  }

  onShowAlert = () => {
    this.setState({alert:true})
  }
  onCloseAlert = () => {
    this.setState({alert:false})
  }

  loadUser = (data) =>{
    
    var obj
    fetch('https://salty-escarpment-76188.herokuapp.com/todo/' + data.id)
      .then(res => res.json())
      .then(data => obj = data)
      .then(() => this.setState({items:obj}))
    this.setState({
      user:{
        id:data.id,
        name:data.name,
        email:data.email
      },
    })

    
  }

  onRouteChange = (route) =>{
    if (route === 'signout'){
      this.setState({isSignedIn:false})
    } else if (route ==='home'){
      this.setState({isSignedIn:true})
    }
    this.setState({route : route})
  }


  addItem = (item, id) =>  {
    if (item.todo !== ""){
      fetch('https://salty-escarpment-76188.herokuapp.com/add/' + id, {
        method:'post',
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify({
          todo:item.todo,
          id:id
        })
      })
      .then( res=> res.json().then(resp=>{
        item.noteid= resp.noteid
        const newItems = [...this.state.items, item]
        this.setState({
          items:newItems
        }) 
      }))
    }

  }

  editItem = (todo, id)=>{
    
    fetch('https://salty-escarpment-76188.herokuapp.com/todo/' + id, {
        method:'PUT',
        headers:{'Content-Type' : 'application/json', 'Authorization' : 'sdfsfsfwiiowuerewrwrewrww'},
        body:JSON.stringify({
          todo:todo
        })
      })
      .then(res => {
        console.log(id)
        const editedItems = this.state.items
        for (let i= 0; i< editedItems.length; i++){
          if(editedItems[i].noteid == id){
            editedItems[i].todo = todo
          }
        }
        this.setState({items:editedItems})
      })
  }

  deleteItem = (key) =>{
    fetch('https://salty-escarpment-76188.herokuapp.com/todo/' + key, {
      method:'delete',
      headers:{'Content-Type' : 'application/json'},
      body:JSON.stringify({ 
        noteid:key
      })
    })
    .then(data =>{
      const filteredItems =  this.state.items.filter(item => item.noteid!== key)
      this.setState({items:filteredItems})
    })
  }

  toggleComplete = (item) => {

    console.log(item)

    if (item.done != 0){
      fetch('https://salty-escarpment-76188.herokuapp.com/toggle/' + item.noteid, {
        method:'PUT',
        headers:{'Content-Type' : 'application/json', 'Authorization' : 'sdfsfsfwiiowuerewrwrewrww'},
        body:JSON.stringify({
          done:0
        })
      })
      .then(res => {
        const editedItems = this.state.items
        for (let i= 0; i< editedItems.length; i++){
          if(editedItems[i].noteid === item.noteid){
            editedItems[i].done = 0
          }
        }
        this.setState({items:editedItems})
      }) 
    } else {
      fetch('https://salty-escarpment-76188.herokuapp.com/toggle/' + item.noteid, {
        method:'PUT',
        headers:{'Content-Type' : 'application/json', 'Authorization' : 'sdfsfsfwiiowuerewrwrewrww'},
        body:JSON.stringify({
          done:1
        })
      })
      .then(res => {
        const editedItems = this.state.items
        for (let i= 0; i< editedItems.length; i++){
          if(editedItems[i].noteid === item.noteid){
            editedItems[i].done = 1
          }
        }
        this.setState({items:editedItems})
      }) 
    }



  }
  
  render(){
    return(
      <div className="App">
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.state.route==='home'
          ? 
            <div>
              <Logo />
              <Particles params={particlesOption} className="particles" />
              <Note   toggleComplete={this.toggleComplete} editItem={this.editItem} deleteItem={this.deleteItem} addItem={this.addItem} items={this.state.items} info={this.state.user} />
            </div>
          : (
            this.state.route === 'signin'
            ? 
              <div>
                <Particles params={particlesOption} className="particles" />
                <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
                </div>
            :
              <div>
                <Particles params={particlesOption} className="particles" />
                <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              </div>
          )
          
        }
      </div>
    )
  }
}

export default App;
