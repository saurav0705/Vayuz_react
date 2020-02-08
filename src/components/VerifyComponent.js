import React,{useState } from "react";
import OTPInput from 'otp-input-react';
import {URL} from '../assets/data';
import { withRouter, Redirect } from 'react-router-dom';


const Verify = () => {
        
        const [interests , setinterests] = useState(false);
        const [OTP, setOTP] = useState("");
        const [error, setErr] = useState("");
        async function submit(OTP){
            console.log('---------------------',OTP);
            const url=URL+'verify/';
            try {
                const response = await fetch(url, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' ,
                  "Access-Control-Allow-Origin":'*',
              'Authorization':'bearer '+localStorage.getItem('token')},
                  body: JSON.stringify({ otp:OTP })
                }
                )
                if (response.ok) {
                  
                  //console.log(.*)$
                  //console.log(.*)$
                  console.log('done');
                  setinterests(true);
                  
                } else {
                  setErr('somethings wrong');
                  
                }
              } catch (error) {
                setErr('server not reachable');
             
            
                }
        }
        return(<>
        {interests ? <Redirect to='/interest' />:  null}
        <div className="p-4 w-75" style={{'margin-left':"10%"}}>
            <center>
            <div className="text-primary">Verify Your Email Address</div>
            <div>Enter 5 Digit OTP sent on {localStorage.getItem('email')} </div>
            <div style={{'margin-left':'40%',
            'margin-top':'10px'}}><OTPInput
                    value={OTP}
                    onChange={setOTP}
                    autoFocus
                    OTPLength={5}
                    otpType="number"
                    disabled={false}
                    /></div>

            <div className="m-2">
            <button type="submit" class="btn btn-primary" onClick={()=>submit(OTP)}>Start Blogging</button>
            </div>
            </center>
            </div>
        
        
        </>);
    
}


export default withRouter(Verify);