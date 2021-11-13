import React from "react"
import '../assets/scss/ShoppingCardContainer.scss';
import {useSelector} from "react-redux";
import Container from "./Container";
import ShoppingPage from "./ShoppingPage";

function ShoppingCardContainer() {
    
    return (
        <Container>
            <div className={"Shopping-card-container"} style={{overflowX:'hidden',height:'90vh'}}>
                <ShoppingPage />
            </div>
        </Container>
    );
}

export default ShoppingCardContainer;
