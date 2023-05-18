import React from 'react';
import './footer.css'
import Link from "next/link";

function Footer(props) {
    return (
        <footer className={'footer__container'}>
            <div className={'footer__info'}>
                <div className={'footer__info-logo'}>
                    <img src={'/icons/logoBlack.png'} alt=""/>
                </div>
                <div className={'footer__info-item'}>
                    <p>
                        Welcome to THIMAR AL SHAMS FOOD & BEVERAGES TRADING L.L.C., the place to find the best natural
                        fruits & vegetables and dry fruits with nuts from Uzbekistan and
                        Azerbaijan
                    </p>
                    <div className={"footer__info-item__socials"}>
                        <a href=""><img src="/icons/instagram.png" alt=""/></a>
                        <a href=""><img src="/icons/facebook.png" alt=""/></a>
                        <a href=""><img src="/icons/twitter.png" alt=""/></a>
                        <a href=""><img src="/icons/whatsapp.png" alt=""/></a>
                    </div>
                </div>
                <div className={'footer__info-item'}>
                    <h1>About</h1>
                    <Link href={'/'}>History</Link>
                    <Link href={'/'}>Our Team</Link>
                    <Link href={'/'}>Terms & Condition</Link>
                    <Link href={'/'}>Privacy Policy</Link>
                </div>
                <div className={'footer__info-item'}>
                    <h1>Services</h1>
                    <Link href={'/'}>How to order</Link>
                    <Link href={'/'}>Our Production</Link>
                    <Link href={'/'}>Order Status</Link>
                    <Link href={'/'}>Promo</Link>
                    <Link href={'/'}>Payment Method</Link>
                </div>
                <div className={'footer__info-item'}>
                    <h1>Other</h1>
                    <Link href={'/'}>Contact Us</Link>
                    <Link href={'/'}>Help</Link>
                    <Link href={'/'}>Privacy</Link>
                </div>
                <div className={'footer__info-item'}>
                    <h1>Address & Contacts</h1>
                    <p>
                        DUBAI, INTERNATIONAL CITY, SPAIN CLUSTER, BUILDING T 01, SHOP 10, P.O. BOX NUMBER 452724.
                    </p>
                    <p>
                        bonafresco@gmail.com
                        <br/>
                        thimaralshams@gmail.com
                    </p>
                    <p>+971 58 534 3113, +971 4 584 4675</p>
                </div>
            </div>
            <span className={'footer__copyright'}>Copyright 2020. All right Reserved</span>
        </footer>
    );
}

export default Footer;