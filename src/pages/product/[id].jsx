import React, {useContext, useState} from 'react';
import "./product.css"
import Button from "@/app/UI/button/Button";
import {AiOutlineMinus, AiOutlinePlus, AiOutlineShoppingCart} from "react-icons/ai";
import {Splide, SplideSlide} from "@splidejs/react-splide";
import Product from "@/app/components/product/Product";
import '@splidejs/react-splide/css';
import axios from "axios";
import {API_URL, API_URL_MEDIA, BASKET, PRODUCTS} from "@/app/services/api/consts";
import product from "@/app/components/product/Product";
import {discountPrice} from "@/app/utils/discountPrice";
import {toast} from "react-toastify";
import {BaseContext} from "@/pages/_app";
import {UpdateContext} from "@/app/App";


function Index(props) {
    const [count, setCount] = useState(0)
    const {activeUser} = useContext(BaseContext)
    const {setUpdate} = useContext(UpdateContext)

    async function addToCart() {
        if (!count) {
            toast.error("select quantity")
            return
        }

        if (activeUser) {
            const ts = toast.loading("please wait...")
            await axios.post(API_URL + BASKET, {
                product_id: props.data.id,
                quantity: count
            }, {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`
                }
            }).then(res => {
                setUpdate(prev => !prev)
                toast.update(ts, {
                    render: "item added",
                    type: "success",
                    isLoading: false,
                    autoClose: 1500
                })
            }).catch(err => {
                console.log(err)
                toast.update(ts, {
                    render: err.response.data.error,
                    type: "error",
                    isLoading: false,
                    autoClose: 1500
                })
            })
            return
        }
        toast.error("pass authorization")
    }

    return (
        <section className={"product_detail__section"}>
            <div className={"product_detail__left"}>
                {props.data.discount && <div className={"product_detail__sale"}>
                    SALE {props.data.discount_percent}%
                    <del>{Number(props.data.price)} AED</del>
                    <b>{discountPrice(props.data.price, props.data.discount_percent)} AED</b>
                </div>}
                <div className={"product_detail__country"}>
                    {props.data.country.name}
                </div>
                <img src={API_URL_MEDIA + props.data.image} alt=""/>
            </div>
            <div className={"product_detail__right"}>
                <div className={"product__header"}>
                    <h1>{props.data.name}</h1>
                    <h4>code: {props.data.product_code}</h4>
                    {/*<Button configure={{*/}
                    {/*    className: "button is_orange"*/}
                    {/*}} typograph={"add to wishlist"}/>*/}
                </div>
                <div>
                    {props.data.description}
                </div>
                <div className={"product__actions"}>
                    <Button configure={{
                        className: "button",
                        onClick: _ => setCount(prev => {
                            if (prev > 0 && props.data.product_type.type === "kg") {
                                return (prev - 0.25)
                            }
                            if (prev > 0 && props.data.product_type.type === "pcs") {
                                return (prev - 1)
                            }
                            return 0
                        })
                    }} typograph={<AiOutlineMinus/>}/>
                    <span>{count}</span>
                    <Button configure={{
                        className: "button is_orange",
                        onClick: _ => setCount(prev => {
                            if (prev < props.data.quantity && props.data.product_type.type === "kg") {
                                return (prev + 0.25)
                            }
                            if (prev < props.data.quantity && props.data.product_type.type === "pcs") {
                                return (prev + 1)
                            }
                        })
                    }} typograph={<AiOutlinePlus/>}/>
                    <span>quantity:{props.data.quantity} {props.data.product_type.type}</span>
                </div>
                <div className={"product__total"}>
                    <span>{props.data.product_type.type === "kg"
                        ? `1 kg: ${props.data.discount ? discountPrice(props.data.price, props.data.discount_percent) : props.data.price} AED`
                        : `1 pcs: ${props.data.discount ? discountPrice(props.data.price, props.data.discount_percent) : props.data.pricee} AED`}</span>
                    <span>total price: {props.data.discount ? count * discountPrice(props.data.price, props.data.discount_percent) : count * props.data.price} AED</span>
                    <Button configure={{
                        onClick: addToCart,
                        className: "button is_orange"
                    }} typograph={<AiOutlineShoppingCart/>}/>
                </div>
            </div>
            <h1>Related products</h1>
            <div className={"product__slide"}>
                {props.related && props.related.map(value => <Product key={value.id} value={value}/>)}
            </div>
        </section>
    );
}

export async function getServerSideProps(context) {
    const data = await axios.get(API_URL + PRODUCTS + "/" + context.query.id, {
        headers: context.req.cookies.token && {
            Authorization: `Token ${context.req.cookies.token}`
        }
    }).then(res => res.data)
    return {
        props: {
            data: data.data.product,
            related: data.data.related
        }
    }
}

export default Index;