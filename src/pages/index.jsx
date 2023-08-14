import React from 'react';
import './index.css'
import CategoryItem from "@/app/components/category/categoryItem/CategoryItem";
import Subscribe from "@/app/components/subcribe/Subscribe";
import axios from "axios";
import {API_URL, CATEGORIES, API_URL_MEDIA} from "@/app/services/api/consts";
import {Pages} from "@/app/router/routes";


function Index({categories}) {
    return (
        <>
            <section className={'daily'}>
                <h1>FAST GROCERY DELIVERY
                    WITH A WIDE ARRAY OF CAREFULLY SELECTED PRODUCE FROM UZBEKISTAN AND CIS AND A HUGE VARIETY OF FRESH
                    MEAT AND SUNDRIES TO CHOOSE FROM.</h1>
                <div className={'daily__content'}>
                    <div className={'daily__content-category'}>
                        {categories.data.map(value => <CategoryItem href={Pages.category_detail + value.id}
                                                                    key={value.id} id={value.id} title={value.name}
                                                                    imgUrl={API_URL_MEDIA + value.image}
                                                                    classFor={'category-item-daily'}/>)}
                    </div>
                    {/* <div className={'daily__content-discount'}>

                    </div> */}
                </div>
            </section>
            <Subscribe/>
        </>
    );
}

export async function getServerSideProps() {
    const categories = await axios.get(API_URL + CATEGORIES + "?limit=6").then(res => res.data)
    return {
        props: {
            categories
        }
    }
}


export default Index;