import React, {useEffect, useState} from 'react';
import './product.css'
import Product from "@/app/components/product/Product";
import Button from "@/app/UI/button/Button";
import {useRouter} from "next/navigation";
import {Pages} from "@/app/router/routes";
import axios from "axios";
import {API_URL, PRODUCTS} from "@/app/services/api/consts";

function Index(props) {
    const [products, setProducts] = useState(null)
    const route = useRouter()

    useEffect(_ => {
        axios.get(API_URL + PRODUCTS, {
            headers: localStorage.getItem("token") && {
                Authorization: `Token ${localStorage.getItem("token")}`
            }
        }).then(res => setProducts(res.data)).then(err => _)
    }, [])

    return (
        <section className={'products-content'}>
            <div className={'products-content__header'}>
                <h1 className={'products-content__title'}>Хиты Продаж</h1>
                <Button typograph={"Каталог"}
                        configure={{className: "button", onClick: _ => route.push(Pages.shop)}}/>
            </div>
            <div className={'products-content__container'}>
                {products && products.data.map( value => <Product value={value} key={value.id} />)}
            </div>
        </section>
    );
}

export default Index;