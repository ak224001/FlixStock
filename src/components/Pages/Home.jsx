import React, {useContext, useEffect, useState} from "react";
import './css/Home.scss';
import Navigation from "../fragment/Navigation";
import MobileTopNavigation from "../fragment/ShoppingTopNavigation";
import SideBar from "../fragment/SideBar";
import BottomNavigationMobile from "../fragment/BottomNavigationMobile";
import ShoppingCardContainer from "../fragment/ShoppingCardContainer";
import {useSelector} from "react-redux";
import {ThemeContext} from "../../api/Theme";
import Profile from "./Profile";

// import Search from "./Search";
import {Skeleton} from "@material-ui/lab";

function getCurrPage(pathName) {
    switch (pathName) {
        case "/home":
            return <ShoppingCardContainer/>
        
        case "/home/profile":
            return <Profile/>
        
        default:
            
            return null
    }
}

function Home() {


    const [screenSize, setScreenSize] = useState(undefined);
    const [currShopping, setCurrShopping] = useState(null);
    const [Page, setCurrPage] = useState(<ShoppingCardContainer/>);
    

    let pathname = window.location.pathname;
    useEffect(() => {
        setCurrPage(getCurrPage(pathname))
    }, [pathname]);

    window.addEventListener("resize", handleResize);

    function handleResize() {
        setScreenSize(window.innerWidth);
    }

    useEffect(() => {
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    });

    const useStyle = useContext(ThemeContext);
    

  

    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true)
    }, []);


    return (
        <div style={useStyle.component} className={"home-container"}>
            {
                !loaded ?
                    <div className="Home-skeleton">
                        <Skeleton animation={"wave"} variant={"rect"} height={"100vh"}/>
                    </div>
                    :
                    <>
                        {
                            screenSize <= 970 ?
                                <MobileTopNavigation/> :
                                <Navigation/>
                        }
                        <section className={"home-Shopping-container"}>
                            <div className="sidebar-home">
                                <SideBar/>
                            </div>
                            <div className="main-home" >
                                
                                {
                                    Page
                                    
                                }
                                
                                
                            </div>
                        </section>
                        
                        <React.Fragment>
                            
                            {
                                screenSize <= 970 && <BottomNavigationMobile/>
                            }
                        </React.Fragment>
                    </>
            }
        </div>
    );
}

export default Home;