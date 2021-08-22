import './ImageLinkForm.css';

export default function ImageLinkForm ({onInputChange, onButtonSubmit}) { 
    
    return(
        <div>
            <p className='f3 white'>
                {`Let us find a celebrity who matches you!`}
            </p>
            <div className= 'center'>
                <div className= 'form center pa4 br3 shadow-3'>
                   <input
                    className='f5 pa2 w-70 center' 
                    type='text'
                    placeholder='Paste image URL'
                    onChange={onInputChange}                    
                    />
                    <button 
                    className= 'w-30 grow f4 link ph3 pv2 dib white bg-light-purple'                    
                    onClick= {onButtonSubmit}
                    >Detect</button> 
                </div>
                
            </div>
        </div>
    );

}