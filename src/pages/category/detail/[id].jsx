import React from 'react';
import axios from "axios";
import {API_URL, CATEGORIES, API_URL_MEDIA} from "@/app/services/api/consts";
import CategoryItem from "@/app/components/category/categoryItem/CategoryItem";
import {Pages} from "@/app/router/routes";
import "./detail.css"
import Link from "next/link";
import {FcNext} from "react-icons/fc";

function Index({subcategories}) {

    return (
        <div className={"subcategories__container"}>
            <h1><Link href={Pages.shop}>{subcategories.category.name}</Link></h1>
            <div className={"subcategories__content"}>
                {subcategories.subcategory.length ? subcategories.subcategory.map(value => <CategoryItem
                    href={Pages.subcategories + value.id}
                    key={value.id} id={value.id}
                    title={value.name}
                    imgUrl={API_URL_MEDIA + value.image}/>) : <h1>Empty...</h1>}
            </div>
        </div>
    )
}

export async function getServerSideProps(context) {
    const subcategories = await axios.get(API_URL + CATEGORIES + "/" + context.query.id).then(res => res.data)
    return {
        props: {
            subcategories: subcategories.data
        }
    }
}

export default Index;