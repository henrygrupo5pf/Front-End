

export const Card=(props)=>{
    return (
        <div >
            <img src={props.photo}></img>
            <p>Price: {props.cost}</p>
            <p>Product: {props.name}</p>
        </div>
    )
};


