import React from "react";
import Shopping from '../assets/img/shopping.jfif';
import './css/Login.scss';
import {Link} from "react-router-dom";

class Login extends React.Component{
    render() {
        return(
            <section id="main">
                    <div className="nav-item">
                        <a className="navbar-brand" href="/">Flix Stock</a>
                    </div>
                    <div className="main-row">
                        <div className="main-row-img">
                            <img className="head-phone-img" src={Shopping} alt=""/>
                        </div>
                        <div className="main-row-text">
                            <h1>Shopping for everyone</h1>
                            <p>Without shopping, life would be a mistake</p>
                            <Link to={"/home"} className="btn">
                                Start Shopping
                            </Link>
                        </div>
                    </div>
            </section>
        );
    }
}

export default Login;