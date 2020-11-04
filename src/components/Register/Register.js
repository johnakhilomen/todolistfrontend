import React from 'react';
import { Alert } from "react-bootstrap"

class Register extends React.Component {
  state = {
    email:"",
    password: "",
    name:"",
    visible:false
  }

  

  onNameChange = (event) => {
    this.setState({
      name:event.target.value
    })
  }

  onEmailChange = (event) =>{
    this.setState({
      email:event.target.value
    })
  }

  onPasswordChange = (event) =>{
    this.setState({
      password:event.target.value
    })
  }

  onShowAlert = ()=>{
    this.setState({visible:true},()=>{
      window.setTimeout(()=>{
        this.setState({visible:false})
      },4000)
    });
  }

  onSubmitSignIn = () =>{
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if ( re.test(this.state.email) ){
      fetch('https://frozen-river-89593.herokuapp.com/register', {
      method:'post',
      headers:{'Content-Type' : 'application/json'},
      body:JSON.stringify({
        name:this.state.name,
        email:this.state.email,
        password:this.state.password
      })
    })
      .then(response => response.json())
      .then(user => {
        if(user.id){
          this.props.loadUser(user)
          this.props.onRouteChange('home')
        }
        else{
          console.log(user)
          this.onShowAlert()
        }
      })
    }  
    else{
      this.onShowAlert()
    }
  }
  

  render() {
    return (
      <div>
      <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  onChange={this.onNameChange}
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={this.onEmailChange}
                  
                  pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                  required
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={this.onPasswordChange}
                  
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
      <Alert variant="info" show={this.state.visible} >
         The email is not valid!!!!
      </Alert>
      </div>
    );
  }
}

export default Register;