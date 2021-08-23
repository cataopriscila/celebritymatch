const CelebrityImage = ({ imageCelebrity, imageCelebrityStep,  nameCelebrity }) => {

    const onError = (e => e.target.src = imageCelebrityStep);      

    return (
        <div>
            <div className= 'mt4'>               
                    <h4 style={{fontSize: '2rem'}}>{nameCelebrity.toUpperCase()}</h4>                             
            </div>            
           <div className= 'relative mt2'>
                <img  alt= '' src= {imageCelebrity} onError= {onError} />                
            </div>                               
        </div>         
    );
}

export default CelebrityImage;
