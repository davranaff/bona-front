import React, {useEffect, useState} from 'react';
import './wishlist.css'
import axios from "axios";
import {API_URL, WISHLIST} from "@/app/services/api/consts";
import {useRouter} from "next/navigation";
import {Pages} from "@/app/router/routes";
import {toast} from "react-toastify";
import Product from "@/app/components/product/Product";


function Index(props) {
    const [wishlist, setWishlist] = useState(null)
    const route = useRouter()

    useEffect(_ => {
        axios.get(API_URL + WISHLIST, {
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            }
        }).then(res => setWishlist(res.data)).catch(err => {
            route.push(Pages.home)
            toast.error("register first")
        })
    }, [])

    return (
        <section className={"wishlist__container"}>
            <h1>Wishlist</h1>
            <div className={"wishlist__container_content"}>
                {wishlist && wishlist.data.map( value => <Product is_wishlist={true} value={value.product} key={value.id}/> )}
            </div>
        </section>
    );
}


export default Index;