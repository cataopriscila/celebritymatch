import './FaceRecognition.css';

function FaceRecognition ({ imageUrl, box }) {   
    return(
        <>
        <div className= 'center column ma'>
            <div className= 'relative mt4'>
               <img id= 'inputimage' alt= '' src= {imageUrl} /> 
               <div className= 'bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div> 
            </div>                                                       
        </div>             
    </>
    );
}

export default FaceRecognition;