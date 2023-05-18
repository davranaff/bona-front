import React, {useState} from 'react';
import "./subcribe.css"

function Subscribe(props) {
    const [email, setEmail] = useState('')

    function sendEmail() {
        setEmail('')
    }

    return (
        <section className={"subscribe"}>
            <div className={"subscribe__content"}>
                <h1>SUBSCRIBE TO OUR NEWSLETTER</h1>
                <h2>we don't spam, we promise!</h2>
                <div className={"subscribe__content-form"}>
                    <input value={email} onInput={e => setEmail(e.target.value)} placeholder={"Your Email"} type="text"/>
                    <button onClick={_ => sendEmail()}>SUBSCRIBE</button>
                </div>
            </div>
        </section>
    );
}

export default Subscribe;