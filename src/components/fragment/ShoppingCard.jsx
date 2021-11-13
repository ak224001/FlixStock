import React, {useEffect, useState} from 'react';
import '../assets/scss/ShoppingCard.scss';
import Name from "./Name";
import {Skeleton} from "@material-ui/lab";
import Box from "@material-ui/core/Box";

function ShoppingCard(props) {
    // const {name, image, _id} = props.shoppingItem? props.shoppingItem: [];

    const [isHovered, setHovered] = useState(false);

    function handleResponse() {
        setHovered(!isHovered);
    }

   

    const [loaded,setLoaded] = useState(false);

    useEffect(()=>{
        setLoaded(true)
    },[]);

    // console.log("name={props.shoppingItem.name}",props.shoppingItem.name);


    return (
        <div className={"Shopping-card"}>
            {
                !loaded ?
                <div className={"Skeleton-top"}>
                    <Skeleton variant="rect" width={210} height={210} />
                    <Box pt={0.5}>
                        <Skeleton />
                        <Skeleton width="60%" />
                    </Box>
                </div>
                    :
                    <>
                        <div  className={"Shopping-card-cover"} style={{border:'1px solid lightgrey'}}>
                            <img src={props.shoppingItem.image && props.shoppingItem.image["fileUrl"]} alt={props.shoppingItem.name}/>
                        </div>
                        <React.Fragment>
                            <Name key ={props.shoppingItem._id} name={props.shoppingItem.name} className={"song-name"} length={props.shoppingItem.name.length}/>
                        </React.Fragment>
                    </>
            }


        </div>
    );
}

export default ShoppingCard;