import React, {createContext, useEffect, useState} from 'react';
import Head from "next/head";
import App from "@/app/App";
import "../app/globals.css"
import axios from "axios";
import {API_URL, PROFILE} from "@/app/services/api/consts";
import {Pages} from "@/app/router/routes";

export const BaseContext = createContext(null)

axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"

function Application({Component, pageProps}) {
    const [userState, setUserState] = useState(null)
    const [basketCount, setBasketCount] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [activeUser, setActiveUser] = useState(false)

    useEffect(_ => {
        if (JSON.parse(localStorage.getItem("active"))) {
            axios.get(API_URL + PROFILE, {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                }
            }).then(res => setUserState(res.data.data)).catch(err => null)
            setActiveUser(true)
        }
    }, [])

    return (
        <BaseContext.Provider value={{
            userState,
            setUserState,
            basketCount,
            setBasketCount,
            showModal,
            setShowModal,
            activeUser,
            setActiveUser
        }}>
            <Head>
                <title>bonafresco</title>
            </Head>
            <App>
                <Component {...pageProps} />
            </App>
        </BaseContext.Provider>
    );
}

export default Application;
