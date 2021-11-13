import React from 'react';
import '../assets/scss/ShoppingCardSpan.scss';


function ShoppingCardSpan({Shopping}) {
    return (
        <div style={{cursor:"pointer"}} className={"ShoppingCardSpan"}>
            <div className={"d1"}>
                <img src={require("../assets/img/"+Shopping.img)} alt=""/>
                <div className="detail">
                    <h4>{Shopping.name}</h4>
                    <p>{Shopping.author_name}</p>
                </div>
            </div>
            
        </div>
    );
}

export default ShoppingCardSpan;