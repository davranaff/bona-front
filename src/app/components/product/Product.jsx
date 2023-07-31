import React, {useContext, useState} from 'react';
import './product.css'
import {useRouter} from "next/navigation";
import Button from "@/app/UI/button/Button";
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {Pages} from "@/app/router/routes";
import {discountPrice} from "@/app/utils/discountPrice";
import {API_URL, BASKET, WISHLIST, API_URL_MEDIA} from "@/app/services/api/consts";
import {toast} from "react-toastify";
import axios from "axios";
import {UpdateContext} from "@/app/App";
import {BaseContext} from "@/pages/_app";


function Product({value, is_wishlist=false}) {
    const route = useRouter()
    const [liked, setLiked] = useState(value.is_liked === 1 || is_wishlist)
    const {setUpdate} = useContext(UpdateContext)
    const {activeUser} = useContext(BaseContext)

    function click() {
        route.push(Pages.product + value.id)
    }

    async function addToCart() {
        if (activeUser) {
            const ts = toast.loading("please wait...")
            await axios.post(API_URL + BASKET, {
                product_id: value.id,
                quantity: value.quantity < 1 ? value.quantity : 1
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

    async function handleLike() {
        const ts = toast.loading("wait please...")
        if (liked) {
            setLiked(false)
            await axios.put(API_URL + WISHLIST, {product_id: value.id}, {
                headers: {Authorization: `Token ${localStorage.getItem("token")}`}
            }).then(res => toast.update(ts, {
                render: res.data.data,
                type: "success",
                isLoading: false,
                autoClose: 1500
            })).catch(err => toast.update(ts, {
                render: err.response.data.error,
                type: "error",
                isLoading: false,
                autoClose: 1500
            }))
            return
        }
        setLiked(true)
        await axios.post(API_URL + WISHLIST, {product_id: value.id}, {
            headers: {Authorization: `Token ${localStorage.getItem("token")}`}
        }).then(res => toast.update(ts, {
            render: res.data.data,
            type: "success",
            isLoading: false,
            autoClose: 1500
        })).catch(err => toast.update(ts, {
            render: err.response.data.error,
            type: "error",
            isLoading: false,
            autoClose: 1500
        }))
    }

    return (
        <div className={'product-block'}>
            {liked ? <span onClick={_ => handleLike()}><AiFillHeart className={"liked"}/></span> :
                <span onClick={_ => handleLike()}><AiOutlineHeart className={"not-liked"}/></span>}
            <img src={API_URL_MEDIA + value.image} alt=""/>
            {value.discount && <div className={"product_sale"}>Sale</div>}
            <div className={"product_country"}>{value.country.name}</div>
            <div className={'product-block__content'}>
                <h3>{value.name} code: {value.product_code}</h3>
                <p>
                    {value.description.slice(0, 50)}...
                </p>
                <h3>{value.discount ? discountPrice(value.price, value.discount_percent) : value.price} AED
                    / {value.product_type.type}</h3>
                <div className={'product-block__content__buttons'}>
                    <Button configure={{onClick: () => click(), className: "button"}} typograph={"Подробнее"}/>
                    <Button
                        configure={{className: "button is_transparent", onClick: _ => addToCart()}}
                        typograph={"В корзину"}/>
                </div>
            </div>
        </div>
    );
}

export default Product;