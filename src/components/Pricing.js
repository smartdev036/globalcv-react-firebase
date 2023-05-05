import React from 'react';
import HNavbar from './HNavbar';

export default () => {
    return (
        <div className="container">
            <HNavbar />
            <div className=" pricing-rt">
                <h1>Pricing</h1>
                <ul>
                    <li>1). Beginner CV price = Rs. 199</li>
                    <li>2). Intermediate CV price = Rs. 299</li>
                    <li>3). Expert CV price = Rs. 399</li>
                </ul>
            </div>
        </div>
    );
}