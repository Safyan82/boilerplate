import Spinner from "../spinner/spinner"

export const ButtonGroup = () => {
    return(
        <div style={{display:'flex', columnGap:'16px'}}>
            <button className="drawer-filled-btn"> Filled btn</button>
            <button className="drawer-outlined-btn"> outlined btn</button>
            <button className={' drawer-outlined-btn'} >
                <Spinner color={"#ff7a53"}/>
            </button>
            <button className="disabled-btn drawer-filled-btn">Disabled btn</button>
        </div>
    )
}