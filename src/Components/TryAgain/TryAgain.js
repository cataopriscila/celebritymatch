import React, { useState, useEffect, useRef} from 'react';

const TryAgain = ({nameCelebrity, imageCelebrity, imageCelebrityStep, onRecall}) => {
    
    const [question, setQuestion] = useState(null);   

    const onError = (e => e.target.src = imageCelebrityStep);    
    
    useEffect(() => {
      if(nameCelebrity !== '') {
       setQuestion(`Not quite? Give it another try!`); 
              
    } else {
        setQuestion(null);   
    }
    },[nameCelebrity]);

    const imgRef = useRef(null);
    
    const scrollToBottom = () => {
        imgRef.current.scrollIntoView({block: "end", behavior: "smooth"})
    }   

    useEffect(() => {        
        scrollToBottom();                  
    }); 

    return (
        <div>
            <div className= 'mt2'>               
                <h4                 
                className='pointer w-25 br2 grow f4 link ph3 pv2 dib white bg-light-purple'
                onClick={onRecall}>{question}</h4>                                           
            </div>      
                        
            <div className= 'relative mt3'>
                <img alt= '' src= {imageCelebrity} onError= {onError} width= '400rem' height= 'auto'/>                
            </div>
            <div ref= {imgRef}></div>                                   
        </div>
    );
}

export default TryAgain;
