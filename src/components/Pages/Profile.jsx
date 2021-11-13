import React, {useEffect, useState} from 'react';
import './css/Profile.scss';
import {Avatar} from "@material-ui/core";
import Container from "../fragment/Container";
import Grade from 'grade-js';


function Profile() {

    useEffect(() => {
        Grade(document.querySelectorAll('.gradient-wrap'))
    });

    return (
        <Container>
            <div className={"Profile"}>
                <div className="top-profile">
                    <Avatar variant={"rounded"} src={require("../assets/img/avatar2.jpg").default}
                            style={{width: "150px", height: "150px"}}>
                        VS
                    </Avatar>
                    <div className="profile-detail">
                        <h3>Aditya kumar</h3>
                        
                    </div>
                </div>
                
            </div>
        </Container>
    );
}

export default Profile;
