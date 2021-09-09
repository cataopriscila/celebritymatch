import './ImageLinkForm.css';

export default function ImageLinkForm ({onInputChange, onImageSubmit}) {    
    
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
                    className= 'w-30 grow f4 link ph3 pv2 dib white bg-light-purple'                    
                    onClick= {onImageSubmit}
                    >Detect</button> 
                </div>               
            </div>
            <div
            style={{display: 'none'}} 
            className= 'w-20 black paraghaphAlert center pa3 br3 shadow-3 f5 mt4'>                
                <p>
                {`PLEASE PASTE A VALID URL`}
                </p>
                <p className='okParagraph br3'>{`OK`}</p>                
            </div>
        </div>
    );

}