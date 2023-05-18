import React from 'react';
import "./subcategories.css"
import axios from "axios";
import {API_URL, SUBCATEGORIES} from "@/app/services/api/consts";
import "./subcategories.css"
import Product from "@/app/components/product/Product";
import Link from "next/link";
import {Pages} from "@/app/router/routes";
import {FcNext} from "react-icons/fc";

function Index({subcategories}) {

    return (
        <div className={"subcategory__container"}>
            <h1>
                <Link href={Pages.shop}>{subcategories.subcategory.category.name} </Link>
                <FcNext/> {subcategories.subcategory.name}
            </h1>
            <div className={"subcategory__content"}>
                {subcategories.products.length ? subcategories.products.map(value => <Product key={value.id} value={value}/>) : <h1>Empty...</h1>}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const subcategories = await axios.get(API_URL + SUBCATEGORIES + "/" + context.query.id, {
        headers: context.req.cookies.token && {
            Authorization: `Token ${context.req.cookies.token}`
        }
    }).then(res => res.data)
    return {
        props: {
            subcategories: subcategories.data
        }
    }
}

export default Index;