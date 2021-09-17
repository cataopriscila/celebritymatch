export default function Attempts ({ userName, userEntries}) {
    return(
        <div className=" mb4">
            <div className= 'white f3'>
                {`Hi, ${userName}! Your current attempt is...`}
            </div>
            <div className= 'white f2'>
                {`#${userEntries}`}
            </div>
        </div>
    );
}