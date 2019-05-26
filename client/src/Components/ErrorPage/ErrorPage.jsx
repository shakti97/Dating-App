import React from 'react';
import './ErrorPage.css';
import {Link} from 'react-router-dom';

const ErrorPage=()=>{
    return(
        <React.Fragment>
            <div className="ErrorPage container">
                <center>
                    <div className="errorHeading">
                        <span>Oops!</span>
                    </div>
                    <div className='errorSubHeading'>
                        <strong>404- PAGE NOT FOUND</strong>
                    </div>
                    <div className='errorContent '>
                        <p>The page you are looking for might have been removed <br/>
                        <center> had its namechange or is temporarily unavailabel</center></p>
                    </div>
                    <div className='errorPage'><Link to='/dashboard' className='errorPageLink'><button className='btn goToHomePage'><strong>Go To HomePage</strong></button></Link></div>
                </center>
            </div>
        </React.Fragment>
    )
}
export default ErrorPage;