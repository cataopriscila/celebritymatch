import { Component } from "react";

class SignIn extends Component {

    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: '',
            isNotRegistred: false
        }
    }
    onEmailChange = (event)=>{
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event)=>{
        this.setState({signInPassword: event.target.value});        

    }

    onSubmitSignInEnter = (event) => {        
        if (event.which === 13) {
            this.onSubmitSignIn();
        }        
    }
    
    onFocusChange = () => {
       this.setState({isNotRegistred: false}); 
    }

    onSubmitSignIn = () =>{        
        fetch('http://localhost:3000/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id){
            this.props.loadUser(user);  
            this.props.onRouteChange('home');  
            } else{
                this.setState({isNotRegistred: true})
            }
        }).catch(err => {
            console.log(err, 'User invalid or not registred');                
        })           
    }       

    render(){
        const { onRouteChange } = this.props; 
        const { isNotRegistred } = this.state;
        
     return(
        <article className="br3 ba b--black-10 mv4 w-90 w-40-m w-25-l mw5 shadow-5 center">
            <main className="pa4 black-80">
                <div className="measure">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                    <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                    <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input 
                    onChange= {this.onEmailChange}
                    onFocus={this.onFocusChange} 
                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="email" 
                    name="email-address"  
                    id="email-address"                    
                    />
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input 
                    onChange= {this.onPasswordChange}
                    onFocus={this.onFocusChange} 
                    onKeyPress={this.onSubmitSignInEnter} 
                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    type="password" 
                    name="password"  
                    id="password"/>
                </div>
                </fieldset>
                
                <div>
                    <input 
                    className="b ph3 pv2 input-reset ba b--black bg-transparent hover-bg-black hover-white grow pointer dib"
                    type="submit"                    
                    value={ isNotRegistred? "Invalid! Try again!": "Sign in"}
                    onClick= {this.onSubmitSignIn}
                    />
                </div>
                
                
                <div className="lh-copy mt3">
                    <p 
                    onClick= {()=> onRouteChange('register')}
                    className="f6 link dim black db pointer">Register</p>
                </div>
                </div>
            </main>
        </article>
    );   
    }    
}

export default SignIn;