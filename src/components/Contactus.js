import React from 'react';
import HNavbar from './HNavbar';

export default () => {
    return (
        <div className="container">
            <HNavbar />
            <div>
                <h1>RING US</h1>
                <p>We will be available form 9 AM to 5 PM from Monday to Saturday on +91 8921 313 091
                    also you can drop text message or Whatsapp here : <a href="https://wa.me/message/H7WMUAQR5IOVC1">https://wa.me/message/H7WMUAQR5IOVC1</a>.
                    We will respond as soon as possible.
                </p>
            </div>
            <div>
                <h1>MAIL US</h1>
                <p>Drop us mail at <a href="mailto:contact@wayanadgreenfresh.com">contact@wayanadgreenfresh.com</a> for any queries, feedback and complaints.</p>
            </div>
            <div>
                <h1>POST TO US</h1>
                <p>Wayanad Green Fresh (OPC) Pvt Ltd, Door # XIV - 91 C, Tharuvana Post, Mananthavady, Wayanad District, Kerala, India - 670 645</p>
            </div>
        </div>
    );
}