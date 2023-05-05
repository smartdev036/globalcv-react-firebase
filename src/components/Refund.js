import React from 'react';
import HNavbar from './HNavbar';

export default () => {
    return (
        <div className="container ">
            <HNavbar />
            <div className='refunc-rt'>
                <h1>Refund policy / Cancellation</h1>
                <h3>As this is a digital service </h3>
                <ul>
                    <li>After payment and if the CV is not generated, in that case the customer can request for a refund and will issue 100% refund.</li>
                    <li>If the payment is done and CV is generated, refund is not possible but can be edited according to the request.</li>
                    <li>Any disputes can be mailed to <a href="mailto:contact@wayandgreenfresh.com">contact@wayandgreenfresh.com</a></li>
                </ul>
            </div>
        </div>
    );
}