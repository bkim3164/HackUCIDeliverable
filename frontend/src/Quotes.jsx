import "./Quote.css";

function Quotes(props) {
    const count = Object.keys(props).length
    const listItems = [];

    for (let i = 0; i < count; i++) {
        listItems.push(
            <div className="quote-card">
                <div className="quote-name">{props[i].name}</div>
                <div className="quote-time">{props[i].time}</div>
                <div className="quote-message">{props[i].message}</div>
            </div>
        )
    }
    return (
        <div className="quote-display">
            {listItems}
        </div>
    );
}




export default Quotes;