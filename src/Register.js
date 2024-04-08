import React, { useState } from "react";
import "./css/Register.css";
import { Link, useSearchParams } from "react-router-dom";



function Register() {
  let [param] = useSearchParams(); // Remove 'param' from useParams()
  const [Err,setErr]=useState("");
  const [passErr,setPassErr]=useState("");
  const checkParams=(event)=>{
    setErr('');
    setPassErr('');
    event.preventDefault();
    const email = event.target.email.value.trim();
    const pass = event.target.pass.value.trim();
    const name = event.target.name.value.trim();
    const passconf = event.target.passconf.value.trim();
    const date = event.target.date.value.trim();
    if(!email || !pass || !name || !passconf||!date){
      setErr('All Fields are required');
      return;
    }
    else if(pass!==passconf)
    {
      setPassErr('Confirm Password and Password Should Match');
      return;
    }
    event.target.submit();

  }

  return (
    <>
      <form onSubmit={checkParams}
        action="http://localhost:3001/registerNode"
        method="post"
        className="register-form"
      >
        <h1 style={{textAlign:'center'}}>Register YourSelf</h1>
        <div className="form-group">
          <label htmlFor="uname">Username:</label>
          <input
            type="email"
            name="email"
            id="uname"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            name="pass"
            id="pass"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" name="name" id="name" className="form-control" />
        </div>
        <div className="form-group">
          <label htmlFor="passconf">Confirm Password:</label>
          <input
            type="password"
            name="passconf"
            id="passconf"
            className="form-control"
          />
        </div>
        {passErr && (
          <div style={{ color: "red" }} className="already">
            {passErr}
          </div>
        )}
        <div className="form-group">
          <label htmlFor="date">DOB:</label>
          <input type="date" name="date" id="date" className="form-control" />
        </div>
        <input type="submit" value="Register" className="btn-submit" />
        <br></br><br></br>
        {param.get('param') === 'old' && (
          <div style={{ color: "red" }} className="already">
            Email ID Already Exists !! Please Login
          </div>
        )}
        {Err && (
          <div style={{ color: "red" }} className="already">
            {Err}
          </div>
        )}
        <div className="already-registered">
        Already registered? <Link to="/login">Click Here</Link>
      </div>
      </form>

      
    </>
  );
}

export default Register;
