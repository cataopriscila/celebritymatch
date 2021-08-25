import { Component } from "react";
import validator from "validator";



class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            isvalidMsg: '',
            color: 'darkred'         
            
        }
    }

    
    onEmailChange = (event) => {       
        this.setState({email: event.target.value})    
               
    }

    onPasswordChange = (event)=>{
        this.setState({password: event.target.value})
    }

    onNameChange = (event)=>{
        this.setState({name: event.target.value})
    }   

    onSubmitRegister = () =>{

        if(validator.isEmail(this.state.email)) {
            fetch('http://localhost:3000/register', {
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    name: this.state.name,
                    email: this.state.email,
                    password: this.state.password
                    
                })
            }).then(response => response.json())
            .then(user => {            
                if(user.id) {
                  this.props.loadUser(user);  
                  this.props.onRouteChange('home');  
                }
            })
            .catch(err => {
                console.log(err, 'Wrong data input!');                       
            }) 
        } else {
            this.setState({
                isvalidMsg: 'Invalid email or password!',
                color: 'darkred'})
        }   
        
                    
    }                
    
    render() {
         
       return(
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw5 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f5" htmlFor="name">Name</label>
                        <input
                        onChange= {this.onNameChange} 
                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="text" 
                        name="name"  
                        id="name"                        
                        />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                        <input
                        onChange= {this.onEmailChange}                        
                        className="pa2 mb2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="email" 
                        name="email-address"
                        id="email-address"                        
                        />
                        <span style={{                            
                            fontWeight: 'bold',
                            color: this.state.color
                            }}                              
                        >{this.state.isvalidMsg}</span>
                    </div>
                    <div className="mv3 required">
                        <label className="db fw6 lh-copy f5" htmlFor="password">Password</label>
                        <input
                        onChange= {this.onPasswordChange} 
                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                        type="password" 
                        name="password"  
                        id="password"                        
                        />
                    </div>
                    </fieldset>
                    <div className="">
                    <input 
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                    type="submit"
                    value="Register"
                    onClick= {this.onSubmitRegister}
                    />
                    </div>                  
                </div>
            </main>
        </article>

    ); 
    }
    
}

export default Register;