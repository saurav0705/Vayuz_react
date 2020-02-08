import React,{ Component } from "react";
import {URL} from '../assets/data';
import {withRouter} from 'react-router-dom';

class Interest extends Component{
    constructor(props){
        super(props);
        this.state={
            int1:false,
            int2:false,
            int3:false,
            int4:false,
            error:"",
            name:"",
            isVerified:false
        }
    }
    toggle(x){
        let update = {};
        update[x] = !this.state[x];
        this.setState(update);
        console.log(this.state[x]);
    }

    componentDidMount(){
        this.getData();

        if(this.state.isVerified || localStorage.getItem('token') === null){
          this.props.history.push('/');
        }
    }


    async getData(){
        const url = URL;
      //console.log(.*)$
      try {
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
                isVerified:user.user.isVerified
                
              });
              console.log(this.state.interests);
              
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


    async submitInterets(){
        var body=[];
        if(this.state.int1)
        {   
            body.push('Interest 1');
        }

        if(this.state.int2)
        {   
            body.push('Interest 2');
        }

        if(this.state.int3)
        {   
            body.push('Interest 3');
        }

        if(this.state.int4)
        {   
            body.push('Interest 4');
        }

        console.log(body);
        const url = URL;
        //console.log(.*)$
        try {
          const response = await fetch(url, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' ,
            "Access-Control-Allow-Origin":'*',
        'Authorization':'bearer '+localStorage.getItem('token')},
            body: JSON.stringify({ interests:body })
          }
          )
          if (response.ok) {
            
            //console.log(.*)$
            //console.log(.*)$
            this.props.history.push('/welcome');
            
          } else {
            this.setState({
              error : "somethings wrong"
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
        <div className="d-block">
            <center>
            <div className="text-primary">Hi  {this.state.name}  Select Your Interest</div>
            <div className="d-inline-flex justify-between w-full">
            <button type="button" class={"btn border border-primary m-1"+(this.state.int1 ? " btn-primary":"")} onClick={()=>{this.toggle('int1')}}>Interest 1</button>
            <button type="button" class={"btn border border-primary m-1"+(this.state.int2 ? " btn-primary":"")} onClick={()=>{this.toggle('int2')}}>Interest 2</button>
            <button type="button" class={"btn border border-primary m-1"+(this.state.int3 ? " btn-primary":"")} onClick={()=>{this.toggle('int3')}}>Interest 3</button>
            <button type="button" class={"btn border border-primary m-1"+(this.state.int4 ? " btn-primary":"")} onClick={()=>{this.toggle('int4')}}>Interest 4</button>
            </div>
            <div className="m-1">
            <button type="button" class="btn btn-primary" onClick={()=>this.submitInterets()}>Next</button>
            </div>
            </center>
        </div>
        </>);
    }
}


export default withRouter(Interest);