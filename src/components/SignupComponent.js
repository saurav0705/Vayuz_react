import React,{ Component } from "react";
import { Link,withRouter } from "react-router-dom";
import {URL} from '../assets/data';
import axios from 'axios';

var loc="";
class Signup extends Component{
    
    constructor(props){
        super(props);
        this.state={
            email:"",
            password:"",
            name:"",
            location:"",
            checked:false,
            error:"",
            toggle:true,
            image:""
        }
    }
    setToggle(){
        this.setState({
            toggle: !this.state.toggle
        })
    }
    componentDidMount(){
        this.getLocation();
    }
    async showPosition(position) {
         const x =("Latitude: " + position.coords.latitude +" Longitude: " + position.coords.longitude);
       console.log('-----------------------------------',x);
       loc=x;
       console.log('-----------------------------------',loc);
        
      }
    async getLocation() {
        if (navigator.geolocation) {
            //console.log('------------',navigator.geolocation.getCurrentPosition(this.showPosition));
              await navigator.geolocation.getCurrentPosition(this.showPosition);
              console.log('*************************',loc);
              this.setState({
                  location : loc
              })
              
          
        } else {
         this.setState({
             error : 'enable geolocation to get started on geolocation not supported'
         }) 
        }
      }
      
    handleClick = (e) => {
        this.inputElement.click();
      }

      validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        //console.log(re.test(email));
        return re.test(email);
      }

    checkPasswordComplexity(pwd) {
        var letter = /[a-zA-Z]/; 
        var number = /[0-9]/;
        var valid = number.test(pwd) && letter.test(pwd); //match a letter _and_ a number
        return valid;
    }
       async signup(){
        if(this.state.email.length<0 || !this.validateEmail(this.state.email))
        {
          this.setState({
            error : 'Email Invalid'
          });
          return ;
        }

        if(this.state.password.length<6)
        {
            this.setState({
                error:'Insufficient Length of password'
            })
            return ;
        }

        if(!this.checkPasswordComplexity(this.state.password))
        {
            this.setState({
                error:'Not Alphanumeric Password'
            })
            return ;
        } 
        
        if(this.state.name === "" || this.state.location === "")
        {
            this.setState({
                error:"Invalid fields"
            })
            return;
        }

        if(!this.state.checked)
        {
            this.setState({
                error:"check to Agree to terms and conditions"
            })
            return;
        }

        if(this.state.image === ""){
            this.setState({
                error:"pls upload image"
            })
            return;
        }

        this.setState({
            error:''
        });
        var data = new FormData();
        data.append('username',this.state.email);
        data.append('password',this.state.password);
        data.append('location',this.state.location);
        data.append('name',this.state.name);
        data.append('profile',this.state.image[0]);
        console.log("-------------------",this.state.image[0]);
        console.log(data);
        const url = URL+'signup/';
        // try {
        //     console.log(JSON.stringify({ username:this.state.email,password:this.state.password ,location:this.state.location,name:this.state.name}));
        //   const response = await fetch(url, {
        //     method: 'POST',
        //     // headers: { 'Content-Type': 'multipart/form-data' ,
        //     // "Access-Control-Allow-Origin":'*'},
        //     // body: data
        //   }
        //   )
        //   if (response.ok) {
        //     console.log(response);
        //     //console.log(.*)$
        //     //console.log(.*)$
        //     this.props.history.push('/');
            
        //   } else {
        //       var res = await response.json();
        //       console.log(res);
        //     this.setState({
        //       error : "Invalid Credentials"
        //         })
            
        //   }
        // } catch (error) {
        //   this.setState({
        //     error : "Server not Reachable"
        //       })
       
      
        //   }

        axios.post(url,data)
        .then((res)=>{console.log(res)
        this.props.history.push('/');
        });
        

       }

       myChangeHandler = (event) => {
        this.setState({
            location : loc
        });
        let nam = event.target.name;
        let val = event.target.value;
        if(nam === 'checked'){
            this.setState({checked : !this.state.checked});

        }
        else{
        this.setState({[nam]: val});}


        if(nam === 'image'){
            this.setState({"image":event.target.files})
            
        }
      }
    render(){
        return(<>
        <div className=" row d-flex justify-content-center">
            <div className=" mr-10" style={{margin:'40px'}}>
        <form className="mx-auto w-full" onSubmit={e => {e.preventDefault();}}>
            <div className="form-group border border-dark rounded">
                <input type="email" onChange={(e)=>this.myChangeHandler(e)} name="email" className="form-control w-100" aria-describedby="inputGroup-sizing-sm"  placeholder="Email" aria-describedby="emailHelp" required />
            </div>
            <div className="form-group border border-dark rounded d-inline-flex justify-content-between w-100">
                <div>
                <input type={this.state.toggle ? 'password':'text'} name="password" className="form-control w-100 border-0 " aria-describedby="inputGroup-sizing-sm"  placeholder="Password" required onChange={(e)=>this.myChangeHandler(e)}/>
                </div>
                <div ><img src="/eye.png" alt="hide" onClick={()=>this.setToggle()} className="pr-2 mt-1" height="30" style={{filter: this.state.toggle ? 'grayscale(100%)':'grayscale(0)'}}/></div>
            </div>
            
            <div className="form-group border border-dark rounded">
                <input type="text" name="name" onChange={(e)=>this.myChangeHandler(e)} className="form-control w-100" aria-describedby="inputGroup-sizing-sm"  placeholder="Full Name" aria-describedby="emailHelp" required/>
            </div>
            <div className="form-group border border-dark rounded">
                <input type="text" disabled value={this.state.location} name="location" className="form-control w-100" aria-describedby="inputGroup-sizing-sm"  placeholder="Current Location" aria-describedby="emailHelp" required/>
            </div>
            <div className="form-group form-check">
            <input type="checkbox" name="checked" className="form-check-input" id="exampleCheck1" onChange={(e)=>this.myChangeHandler(e)}/>
            <label className="form-check-label font-weight-light" htmlFor="exampleCheck1">I agree to all Terms & Conditions.</label>
            </div>
            
            <div className="mx-auto">
                <center>
            <button onClick={()=>this.signup()} className="btn btn-primary">Sign Up</button>
            <div style={{fontSize:'small'}}>Already A Member?<span className="" style={{color:'blue'}}><Link to="/"> Sign In</Link></span></div>
            </center>
            </div>
            <div>
        <center className="text-danger m-4">{this.state.error}</center>
            </div>
            </form>
        </div>
        <div style={{margin:'40px'}}>
            <div className="border border-primary" onClick={() => this.handleClick()}>
            <img  src="/profile.png" alt="upload" height="192" width="192"/>
            <div className="text-center">Add profile pic</div>
            <input name="image" onChange={(e)=>this.myChangeHandler(e)} type="file" hidden ref={input => this.inputElement = input}/>
            </div>
        </div>
        </div>

        </>);
    }
}


export default withRouter(Signup);