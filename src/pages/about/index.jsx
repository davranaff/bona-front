import React from 'react';
import './about.css'

function Index(props) {
    return (
        <section className={"about__container"}>
            <h1>About</h1>
            <p>Hello and welcome to THIMAR AL SHAMS FOOD & BEVERAGES TRADING L.L.C. , the place to find the best natural
                fruits & vegetables and dry fruits with nuts from Uzbekistan and Azerbaijan</p>
            <h1>Contact</h1>
            <p>
                <b>Telephones:</b>
                <a href={"tel:+971585343113"} className={"about__container_link"}>+971585343113</a>,
                <a href={"tel:+97145844675"} className={"about__container_link"}>+97145844675</a>
            </p>
            <p>
                <b>Emails: </b>
                <a href="mailto:info@bonafresco.com" className={"about__container_link"}>info@bonafresco.com </a>,
                <a href="mailto:bonafresco@gmail.com" className={"about__container_link"}>bonafresco@gmail.com </a>,
                <a href="mailto:thimaralshams@gmail.com"
                   className={"about__container_link"}>thimaralshams@gmail.com </a>
            </p>
            <h1>About</h1>
            <p>
                We thoroughly check the quality of our goods, working only with reliable suppliers so that you only
                receive the best quality product.

                We are THIMAR AL SHAMS established in 2022.

                All products are air-freight imported. At the present time we are working with Uzbekistan Airlines
                from Uzbekistan and Fly Dubai from Azerbaijan with total capacity of 15,000 kg fresh fruits and
                vegetables per week. All our products are being kept in well maintained cold storages.

                We at THIMAR AL SHAMS FOOD & BEVERAGES TRADING L.L.C. believe in high quality and exceptional
                customer service.

                But most importantly, we believe shopping is a right, not a luxury, so we strive to deliver the best
                products at the most affordable prices, and bring them to you regardless of where you are.
            </p>
            <h1>We Accept</h1>
            <div className={"about__container_methods"}>
                <img src="/icons/visa.png" alt=""/>
                <img src="/icons/master.png" alt=""/>
                <img src="/icons/apple.png" alt=""/>
                <img src="/icons/cash.svg" alt=""/>
            </div>
            <div className={"about__container_map"}>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d7222.106426592057!2d55.398216!3d25.167681!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f67f051f1f061%3A0x29ef6ba1f8e4d8a8!2sUZBEK%20TOMATO%20PINK%20SHOP!5e0!3m2!1sen!2sru!4v1683009430194!5m2!1sen!2sru"
                    allowFullScreen="" loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </section>
    );
}

export default Index;