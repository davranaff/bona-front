import React from 'react';
import './categoryItem.css'
import Link from "next/link";
import {Pages} from "@/app/router/routes";

function CategoryItem({ title, imgUrl, classFor=null, href=Pages.home }) {
    return (
        <Link href={href} className={classFor || 'category-item'}>
            <p>{title}</p>
            <img src={imgUrl} alt={title}/>
        </Link>
    );
}

export default CategoryItem;