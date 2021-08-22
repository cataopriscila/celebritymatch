import React from 'react';

function Navigation ({onRouteChange, isSignedIn}) {
    
            return (
                isSignedIn? 

            <nav style={{display:'flex', justifyContent:'flex-end'}}
                className='mr4'>
                <p 
                className='f4 link dim white underline pa3 pointer'
                onClick= {() => onRouteChange('signout')}>Sign Out</p>
            </nav>
            :
            <nav style={{display:'flex', justifyContent:'flex-end'}}
                    className='mr4 nav'>
                <p 
                className='f4 link dim black underline pa3 pointer'
                onClick= {() => onRouteChange('signin')}>Sign In</p>
                <p 
                className='f4 link dim black underline pa3 pointer'
                onClick= {() => onRouteChange('register')}>Register</p>
            </nav>
        );            
                     
            
    } 

    export default Navigation;
               