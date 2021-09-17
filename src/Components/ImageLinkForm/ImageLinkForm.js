import './ImageLinkForm.css';

export default function ImageLinkForm ({onInputChange, onImageSubmit, isNotValidURL, backToLinkForm, onClear}) {    
    
    return(
        <div>
            <p className='f3 white'>
                {`Let us find a celebrity who matches you!`}
            </p>
            <div className= 'center'>
                <div className= 'form center pa4 br3 shadow-3'>
                   <input
                    className='f5 pa2 w-70 center ' 
                    type='text'
                    placeholder='Paste an image URL'
                    onChange={onInputChange}                    
                    />              
                    
                    <button 
                    className= 'w-20 grow f4 link ph3 pv2 dib white bg-light-purple'                    
                    onClick= {onImageSubmit}
                    >Detect</button>
                    <button 
                    className= 'w-10 grow f4 link ml4 ph1 pv2 dib white bg-light-purple'                    
                    onClick= {onClear}
                    >Clear</button> 
                </div>
                
                

                             
            </div>
            <div                       
            style={isNotValidURL? {display: 'inline-block'}  : {display: 'none'}}
            className='w-20 white b center pa3 br3 shadow-3 f4 mt4 '
            >
                <div className= ''>                    
                        <p>
                        {`PLEASE PASTE A VALID URL`}
                        </p>
                        <p 
                        className='br3 white alertButton'
                        onClick={backToLinkForm}>
                        {`OK`}
                        </p>
                                       
                </div>                               
            </div>
        </div>
    );

}