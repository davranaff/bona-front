import React, {useContext, useEffect, useState} from 'react';
import './cart.css'
import {AiOutlineDelete, AiOutlineMinus, AiOutlinePlus} from "react-icons/ai";
import Button from "@/app/UI/button/Button";
import {useRouter} from "next/navigation";
import {Pages} from "@/app/router/routes";
import Link from "next/link";
import axios from "axios";
import {API_URL, BASKET} from "@/app/services/api/consts";
import {toast} from "react-toastify";
import {UpdateContext} from "@/app/App";

function Index({withoutOrder = false}) {
    const [basket, setBasket] = useState({
        data: []
    })
    const [total, setTotal] = useState(0)
    const {update} = useContext(UpdateContext)
    const route = useRouter()

    useEffect(_ => {
        axios.get(API_URL + BASKET, {
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            }
        }).then(res => {
            setBasket(res.data)
            if (res.data.data.length) {
                let sum = 0
                res.data.data.forEach(value => {
                    sum += Number(value.total)
                })
                setTotal(sum)
            } else {
                setTotal(0)
            }
        }).catch(err => {
            toast.error("register first")
            route.push(Pages.home)
        })
    }, [update])

    return (
        <section className={"cart__container"}>
            <h1>Cart</h1>
            <div className={"blocks"}>
                {basket.data.length ? basket.data.map((value, index) => <CartItem setBasket={setBasket} key={value.id}
                                                                                  item={value}
                                                                                  index={index}/>) : <h1>Empty...</h1>}
            </div>
            {!withoutOrder && <div className={"cart_total"}>
                <span>count: {basket.data.length}</span>
                <span>total price: {total} AED</span>
                <Button configure={{
                    className: "button is_orange",
                    onClick: _ => {
                        if (basket.data.length) {
                            route.push(Pages.order)
                            return
                        }
                        toast.warn("add product first")
                    }
                }} typograph={"Order"}/>
            </div>}
        </section>
    );
}

function CartItem({item, index, setBasket}) {
    const [quantity, setQuantity] = useState(item.quantity)
    const [total, setTotal] = useState(Number(item.total))
    const {setUpdate} = useContext(UpdateContext)

    function handleCount(type) {
        if (type === "dec") {
            setQuantity(prev => {
                if (prev > 1 && item.product.product_type.type === "kg") {
                    res(prev - 0.25)
                    return (prev - 0.25)
                }
                if (prev > 1 && item.product.product_type.type === "pcs") {
                    res(prev - 1)
                    return (prev - 1)
                }
                return 1
            })
        }
        if (type === "inc") {
            setQuantity(prev => {
                if (prev < item.product.quantity && item.product.product_type.type === "kg") {
                    res(prev + 0.25)
                    return (prev + 0.25)
                }
                if (prev < item.product.quantity && item.product.product_type.type === "pcs") {
                    res(prev + 1)
                    return (prev + 1)
                }
            })
        }
    }

    async function res(count) {
        await axios.post(API_URL + BASKET, {
            product_id: item.product.id,
            quantity: count
        }, {
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            }
        }).then(res => setUpdate(prev => !prev))
    }


    return (
        <div className={"block"}>
            <span>№{index + 1}</span>
            <Link href={Pages.product + item.id}>{item.product.name}</Link>
            <span>{total} AED/{item.product.product_type.type}</span>
            <span>{quantity} {item.product.product_type.type}</span>
            <div className={"block__buttons"}>
                <Button configure={{
                    onClick: _ => handleCount("dec"),
                    className: "button is_orange"
                }} typograph={<AiOutlineMinus/>}/>
                <span>{quantity}</span>
                <Button configure={{
                    onClick: _ => handleCount("inc"),
                    className: "button is_orange"
                }} typograph={<AiOutlinePlus/>}/>
                <Button configure={{
                    onClick: _ => {
                        axios.put(API_URL + BASKET, {
                            basket_id: item.id
                        }, {
                            headers: {
                                Authorization: `Token ${localStorage.getItem("token")}`
                            }
                        }).then(res => {
                            setUpdate(prev => !prev)
                            setBasket(prev => {
                                return {...prev, data: prev.data.filter(value => value.id !== item.id)}
                            })
                            toast.warn("product deleted")
                        }).catch(err => toast.error("register first"))
                    },
                    className: "button is_orange"
                }} typograph={<AiOutlineDelete/>}/>
            </div>
        </div>
    )
}

export default Index;