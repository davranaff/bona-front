import React, {useContext, useEffect, useState} from 'react';
import "./order.css"
import Cart from "@/pages/cart";
import Button from "@/app/UI/button/Button";
import Input from "@/app/UI/input/Input";
import {toast} from "react-toastify";
import axios from "axios";
import {API_URL, BASKET_TOTAL, DELIVERY_COUNTRIES, ORDER} from "@/app/services/api/consts";
import {Pages} from "@/app/router/routes";
import {useRouter} from "next/navigation";
import {UpdateContext} from "@/app/App";


function Index({countries}) {
    const [selectDelivery, setSelectDelivery] = useState(countries.data[0])
    const [street, setStreet] = useState("")
    const [home, setHome] = useState("")
    const [telephone, setTelephone] = useState("")
    const [total, setTotal] = useState(0)
    const route = useRouter()
    const {setUpdate} = useContext(UpdateContext)

    useEffect(_ => {
        axios.get(API_URL + BASKET_TOTAL, {
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            }
        }).then(res => setTotal(res.data.data))
        setTelephone(JSON.parse(localStorage.getItem("user")).telephone)
    }, [])

    async function submitHandle(event) {
        event.preventDefault()
        const toastId = toast.loading("please wait...")
        await axios.post(API_URL + ORDER, {
            home,
            street,
            telephone,
            delivery_city: selectDelivery.id
        }, {
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            }
        }).then(res => {
            toast.update(toastId, {
                render: res.data.data,
                type: "success",
                isLoading: false,
                autoClose: 1500
            })
            setUpdate(prev => !prev)
            route.push("/")
        }).catch(err => {
            toast.update(toastId, {render: err.response.data.error, type: "error", isLoading: false, autoClose: 1500})
        })
    }


    return (
        <section className={"order__container"}>
            <Cart withoutOrder={true}/>
            <div className={"order__container_body"}>
                <form className={"order__form"} onSubmit={event => submitHandle(event)}>
                    <p>Choose a delivery city</p>
                    <div className={"order__buttons"}>
                        {countries.data.map(value => <Button configure={{
                            className: "button is_transparent " + (selectDelivery.id === value.id && "is_focus"),
                            onClick: _ => setSelectDelivery(value),
                            type: "button"
                        }} typograph={value.city}/>)}
                    </div>
                    <div className={"order__options"}>
                        <span>Delivery price: {selectDelivery.delivery_price} AED</span>
                        <span>Total price - {total + selectDelivery.delivery_price} AED</span>
                        <Button configure={{
                            className: "button",
                        }} typograph={"Create order"}/>
                    </div>
                    <div className={"order__form_item"}>
                        <p>Street</p>
                        <Input configure={{
                            className: "input is_orange",
                            placeholder: "write your street...",
                            type: "text",
                            minLength: "2",
                            required: true,
                            value: street,
                            onInput: e => setStreet(e.target.value)
                        }}/>
                    </div>
                    <div className={"order__form_item"}>
                        <p>Home</p>
                        <Input configure={{
                            className: "input is_orange",
                            placeholder: "write your home...",
                            type: "text",
                            minLength: "1",
                            required: true,
                            value: home,
                            onInput: e => setHome(e.target.value)
                        }}/>
                    </div>
                    <div className={"order__form_item"}>
                        <p>Telephone</p>
                        <Input configure={{
                            className: "input is_orange",
                            placeholder: "write your telephone number...",
                            type: "text",
                            minLength: "7",
                            required: true,
                            value: telephone,
                            onInput: e => setTelephone(e.target.value)
                        }}/>
                    </div>
                </form>
            </div>
        </section>
    );
}


export async function getServerSideProps() {
    try {
        const countries = await axios.get(API_URL + DELIVERY_COUNTRIES).then(res => res.data)
        return {
            props: {
                countries,
            }
        }
    } catch {
        return {
            redirect: {
                permanent: false,
                destination: Pages.home,
            },
        }
    }
}

export default Index;