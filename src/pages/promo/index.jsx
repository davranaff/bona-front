import React, {useEffect, useState} from 'react';
import "./promo.css"
import axios from "axios";
import {API_URL, PROMO} from "@/app/services/api/consts";
import Product from "@/app/components/product/Product";

function Index() {
    const [data, setData] = useState(null)

    useEffect(_ => {
        const token = localStorage.getItem("token")
        axios.get(API_URL + PROMO, {
            headers: token && {
                Authorization: `Token ${token}`
            }
        }).then(res => setData(res.data))
    }, [])

    return (
        <div className={"promo__container"}>
            <h1>Promo</h1>
            <div className={"promo__content"}>
                {data && data.data.length ? data.data.map(value => <Product key={value.id} value={value}/>) :
                    <h1>Empty...</h1>}
            </div>
        </div>
    );
}


export default Index;