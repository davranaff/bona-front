import React from 'react';
import './shop.css'
import Product from "@/app/components/product/Product";
import '@splidejs/react-splide/css';
import axios from "axios";
import {API_URL, CATEGORIES, API_URL_MEDIA} from "@/app/services/api/consts";
import CategoryItem from "@/app/components/category/categoryItem/CategoryItem";
import {Pages} from "@/app/router/routes";

function Index({categories}) {
    return (
        <section className={"shop__container"}>
            <h1>Shop</h1>
            <div className={"shop__container_item"}>
                {categories.data && categories.data.map(value => <CategoryItem href={Pages.category_detail + value.id}
                                                                               key={value.id} id={value.id}
                                                                               title={value.name}
                                                                               imgUrl={API_URL_MEDIA + value.image}/>)}
            </div>
        </section>
    );
}

export async function getServerSideProps() {
    const categories = await axios.get(API_URL + CATEGORIES).then(res => res.data)

    return {
        props: {
            categories
        }
    }
}

export default Index;
