import React,{ Component } from "react";
import {Link , withRouter} from 'react-router-dom';
import {URL} from '../assets/data';

class Login extends Component{
    constructor(props){
        super(props);
        this.state={
            toggle: true,
            email:"",
            password:"",
            error:''
        }
    }
    componentDidMount()
        {
            localStorage.clear();
        }   

async login(){
       

      if(this.state.email === '' || this.state.password === '')
    {this.setState({
      error : "Fields can't be Empty"
        })}
        else{
        this.setState({
            error:""
        })
      const url = URL+'login/'
      //console.log(.*)$
      try {
          console.log(JSON.stringify({ username:this.state.email,password:this.state.password }));
        const response = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' ,
          "Access-Control-Allow-Origin":'*'},
          body: JSON.stringify({ username:this.state.email,password:this.state.password })
        }
        )
        if (response.ok) {
          const user = await response.json()
          console.log(user);
          localStorage.setItem('loggedIn','true');
          localStorage.setItem('token',user.token);
          //console.log(.*)$
          //console.log(.*)$

          if(user.user.isVerified && user.user.interests.length>0){    
            this.props.history.push('/welcome');
          }else{
              if(!user.user.isVerified){this.props.history.push('/verify');}
              else{this.props.history.push('/interest');}
          }
          
        } else {
          this.setState({
            error : "Invalid Credentials"
              })
          
        }
      } catch (error) {
        this.setState({
          error : "Server not Reachable"
            })
     
    
        }
    

        
    }
}
    

    setToggle(){
        this.setState({
            toggle: !this.state.toggle
        })
    }
    myChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
      }
    render(){
        return(<>
        <div className="row">
        <form className="mx-auto" onSubmit={e => {e.preventDefault();}}>
            <div className="form-group border border-dark rounded">
                <input type="text" name="email" className="form-control w-100" aria-describedby="inputGroup-sizing-sm"  placeholder="Email" aria-describedby="emailHelp" required onChange={(e)=>this.myChangeHandler(e)}/>
            </div>
            <div className="form-group border border-dark rounded d-inline-flex justify-content-between w-100">
                <div>
                <input type={this.state.toggle ? 'password':'text'} name="password" className="form-control w-100 border-0 " aria-describedby="inputGroup-sizing-sm"  placeholder="Password" required onChange={(e)=>this.myChangeHandler(e)}/>
                </div>
                <div ><img src="/eye.png" alt="hide" onClick={()=>this.setToggle()} className="pr-2 mt-1" height="30" style={{filter: this.state.toggle ? 'grayscale(100%)':'grayscale(0)'}}/></div>
            </div>
            <div className="form-group">
            <span className="text-right p-0 forgot font-weight-bold">Forgot Password?</span>
            </div>
        
            <div className="mx-auto">
                <center>
            <button className="btn btn-primary" onClick={()=>this.login()}>Sign In</button>
            <div style={{fontSize:'small'}}>New to site?<span className="" style={{color:'blue'}} ><Link to='/signup'> Sign Up</Link></span></div>
            <div className="text-danger">{this.state.error}</div>
            </center>
            </div>
            </form>
        </div>
        </>);
    }
}


export default withRouter(Login);