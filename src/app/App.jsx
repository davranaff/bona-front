import React, {createContext, useContext, useEffect, useState} from 'react';
import Navbar from "@/app/components/navbar/Navbar";
import Footer from "@/app/components/footer/Footer";
import Header from "@/app/components/header/Header";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import {API_URL, HOME} from "@/app/services/api/consts";
import {BaseContext} from "@/pages/_app";
import Product from "@/app/components/product/Product";


export const UpdateContext = createContext(null)

axios.defaults.headers.common['Access-Control-Allow-Origin'] = "*"


function App({children}) {
    const [home, setHome] = useState(null)
    const [update, setUpdate] = useState(false)
    const [search, setSearch] = useState(null)

    useEffect(_ => {
        axios.get(API_URL + HOME, {
            headers: localStorage.getItem("token") && {
                Authorization: `Token ${localStorage.getItem("token")}`
            }
        }).then(res => setHome(res.data.data)).catch(err => _)
    }, [update])

    return (
        <UpdateContext.Provider value={{update, setUpdate, setSearch}}>
            <section style={{position: "relative"}}>
                <Navbar count={home && home.count} total={home && home.total}/>
                <Header banner={home && home.banner}/>
                {search && <div className={"search_container"}>
                    <h1>Search result</h1>
                    <div className={"search_container__content"}>
                        {search.map(value => <Product key={value.id} value={value}/>)}
                    </div>
                </div>}
                <div>
                    {children}
                </div>
                <Footer/>
                <ToastContainer
                    position="bottom-right"
                    autoClose={1500}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="colored"
                />
            </section>
        </UpdateContext.Provider>
    );
}

export default App;
