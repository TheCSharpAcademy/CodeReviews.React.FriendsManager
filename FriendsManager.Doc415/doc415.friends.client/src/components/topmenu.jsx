
const Topmenu = ({ onSelect }) => {
    return (
        <div className="topMenu dancingFont">
            <div className="text-center" >
                <h1>Friends Manager</h1>
            </div>
            <div className="text-center">
                <button className="topMenuButton" onClick={() => {
                    onSelect(false)
                }}>Friends </button>
                <button className="topMenuButton" onClick={() => {
                    onSelect(true)
                }}>Categories</button>
            </div>
        </div>
    )
}

export default Topmenu