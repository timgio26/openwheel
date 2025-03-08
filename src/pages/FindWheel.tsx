export function FindWheel(){
    const day = new Date()
    const dayIdx = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(day.toDateString().split(' ')[0])
    console.log(dayIdx)
    return(
        <div>
            <h1>{day.toDateString()}</h1>
        </div>
    )
}