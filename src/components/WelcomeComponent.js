import React,{ Component } from "react";
import {URL} from '../assets/data';
import {withRouter} from 'react-router-dom';

class Welcome extends Component{
    constructor(props){
        super(props);
        this.state={
            interests:[],
            location:"",
            name:"",
            image:null
        }
    }

    componentDidMount(){
            this.getData();    
    }

    async getData(){
        const url = URL;
      //console.log(.*)$
      try {
          console.log(JSON.stringify({ username:this.state.email,password:this.state.password }));
        const response = await fetch(url, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' ,
          "Access-Control-Allow-Origin":'*','Authorization':'bearer '+localStorage.getItem('token')},
        }
        )
        if (response.ok) {
          const user = await response.json()
          console.log('----------------',user.user);
          if(!user.user.isVerified){
          this.props.history.push('/verify');}
          else{
              this.setState({
                name:user.user.name,
                location:user.user.location,
                interests:[...user.user.interests],
                image:user.user.image
              });
              console.log(this.state.image);
              
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


    render(){
        return(<>
        <div className="m-1 p-1">
            <center>
            <div className="text-primary">Welcome {this.state.name}</div>
            <div className=""><img src={this.state.image ? ("https://vayuz-267610.appspot.com"+this.state.image):"/welcome.png" }height="200px" width="200px" /></div>
            <div className="m-1">Your location is {this.state.location}</div>
            <div className="m-1">Your Interest are:</div>
            <div className="d-inline-flex">
                {this.state.interests.map((int)=>{
                    return <button type="button" class="btn border-primary m-1">{int}</button>
                })}
            </div>
            <div>
            <button type="button" class="btn btn-primary">Start Blogging</button>
            </div>
            </center>
        </div>
        </>);
    }
}


export default withRouter(Welcome);