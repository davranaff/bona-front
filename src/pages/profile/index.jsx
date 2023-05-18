import React, {useContext, useEffect, useState} from 'react';
import "./profile.css"
import Button from "@/app/UI/button/Button";
import {BaseContext} from "@/pages/_app";
import Modal from "@/app/components/modal/Modal";
import Input from "@/app/UI/input/Input";
import axios from "axios";
import {API_URL, PROFILE, RESET_PASSWORD, VERIFY_EMAIL} from "@/app/services/api/consts";
import {useRouter} from "next/navigation";
import {Pages} from "@/app/router/routes";
import {toast} from "react-toastify";

const Types = {
    edit: "edit",
    reset: "reset",
    confirm: "confirm"
}

function Index(props) {
    const {setShowModal, setUserState, setActiveUser} = useContext(BaseContext)
    const [modal, setModal] = useState(null)
    const [user, setUser] = useState(null)
    const route = useRouter()


    useEffect(_ => {
        axios.get(API_URL + PROFILE, {
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            }
        }).then(res => setUser(res.data.data)).catch(_ => route.push(Pages.home))
    }, [])

    console.log(user)

    return (
        <section className="profile__container">
            {(modal === Types.confirm && (user && !user.user.confirmed)) && <Confirm setUserState={setUserState}/>}
            {modal === Types.edit && <EditProfile/>}
            {modal === Types.reset && <ResetPassword setShowModal={setShowModal}/>}
            <div className={"profile__container_header"}>
                <h1>{user && user.user.username}</h1>
                <div className={"profile__container_header__buttons"}>
                    <Button configure={{
                        className: "button " + ((user && user.user.confirmed) && "is_orange"), onClick: () => {
                            setModal(Types.confirm)
                            setShowModal(true)
                        }
                    }}
                            typograph={user && user.user.confirmed ? "Your email confirmed" : "Confirm Email"}/>
                    {/*<Button configure={{*/}
                    {/*    className: "button", onClick: () => {*/}
                    {/*        setModal(Types.edit)*/}
                    {/*        setShowModal(true)*/}
                    {/*    }*/}
                    {/*}}*/}
                    {/*        typograph={"Edit Profile"}/>*/}
                    <Button configure={{
                        className: "button", onClick: () => {
                            setModal(Types.reset)
                            setShowModal(true)
                        }
                    }}
                            typograph={"Reset Password"}/>
                    <Button configure={{
                        className: "button", onClick: () => {
                            localStorage.setItem("active", JSON.stringify(false))
                            setActiveUser(false)
                            document.cookie = "token= ; expires = Thu, 01 Jan 1970 00:00:00 GMT"
                            route.push(Pages.login)
                        }
                    }}
                            typograph={"Logout"}/>
                </div>
            </div>
            <div className={"profile__container_content"}>
                <div className={"profile__container_content__item"}>
                    <ul>
                        <li>Join Date: {user && user.user.date_joined}</li>
                        <li>Email: {user && user.user.custom_email.email}</li>
                        <li>Telephone: {user && user.user.telephone}</li>
                    </ul>
                </div>
            </div>
            <div className={"profile__container_orders"}>
                <h1>My orders</h1>
                <div className={"profile__container_orders__content"}>
                    {user && user.order.length ? user.order.map((value, index) => <div
                        key={value.id}
                        className={"profile__container_orders__content_item"}>
                        <div className={"profile__container_orders__content_item-header"}>
                            <p>order id: <b>#{value.order_id}</b></p>
                            <p>address: <b>{value.delivery_city.city} {value.street} {value.home}</b></p>
                            <p>owner telephone: <b>{value.telephone}</b></p>
                            <p>delivery price: <b>{value.delivery_city.delivery_price}</b> AED</p>
                        </div>
                        {value.order_product_order.map((item, item_index) => <div className={"profile__product"}
                                                                                  key={item.id}>
                            <p>#{item_index + 1}</p>
                            <p>product: {item.basket.product.name}</p>
                            <p>quantity: {item.basket.quantity} {item.basket.product.product_type.type}</p>
                            <p>total: {item.basket.total} AED</p>
                        </div>)}
                        <div>total price: <b>{value.total}</b> AED</div>
                    </div>) : <h2>Empty...</h2>}
                </div>
            </div>
        </section>
    );
}

function ResetPassword({setShowModal}) {
    const [oldPassword, setOldPassword] = useState("")
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")

    async function handleSubmit(event) {
        event.preventDefault()
        const ts = toast.loading("wait please...")
        if (password === newPassword) {
            axios.put(API_URL + RESET_PASSWORD, {
                old_password: oldPassword,
                new_password: newPassword
            }, {headers: {Authorization: `Token ${localStorage.getItem("token")}`}})
                .then(res => {
                    setShowModal(false)
                    toast.update(ts, {
                        render: res.data.data,
                        type: "success",
                        isLoading: false,
                        autoClose: 1500
                    })
                }).catch(err => toast.update(ts, {
                render: err.response.data.error,
                type: "error",
                isLoading: false,
                autoClose: 1500
            }))
            return
        }
        toast.error("password mismatch")
    }

    return (
        <Modal>
            <form onSubmit={handleSubmit}>
                <Input configure={{
                    required: true,
                    className: "input",
                    type: "password",
                    placeholder: "old password",
                    value: oldPassword,
                    minLength: 8,
                    onInput: e => setOldPassword(e.target.value)
                }}/>
                <div className={"form__passwords"}>
                    <Input configure={{
                        required: true,
                        className: "input",
                        type: "password",
                        placeholder: "new password",
                        value: password,
                        minLength: 8,
                        onInput: e => setPassword(e.target.value)
                    }}/>
                    <Input configure={{
                        required: true,
                        className: "input",
                        type: "password",
                        placeholder: "confirm password",
                        value: newPassword,
                        minLength: 8,
                        onInput: e => setNewPassword(e.target.value)
                    }}/>
                </div>
                <Button typograph={"Reset Password"} configure={{
                    className: "button is_fullwidth is_orange",
                }}/>
            </form>
        </Modal>
    )
}

function EditProfile() {

    function editProfile(event) {
        event.preventDefault()
    }

    return (
        <Modal>
            <form onSubmit={event => editProfile(event)}>
                <Input configure={{
                    type: "text", placeholder: "name", className: "input", onInput: (event) => {
                    },
                    required: true
                }}/>
                <Input configure={{
                    type: "email",
                    placeholder: "email",
                    className: "input",
                    onInput: (event) => {
                    },
                    required: true
                }}/>
                <Input configure={{
                    type: "telephone",
                    placeholder: "telephone",
                    className: "input",
                    onInput: (event) => {
                    },
                    required: true
                }}/>
                <Button configure={{
                    className: "button is_fullwidth is_orange",
                }} typograph={"Edit"}/>
            </form>
        </Modal>
    )
}

function Confirm({setUserState}) {
    const [value, setValue] = useState("")

    async function confirm(event) {
        event.preventDefault()
        const ts = toast.loading("please wait...")
        await axios.post(API_URL + VERIFY_EMAIL, {
            code: value
        }, {
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            }
        }).then(res => {
            toast.update(ts, {
                render: res.data.data,
                type: "success",
                isLoading: false,
                autoClose: 1500
            })
            setUserState(prev => ({...prev, confirmed: true}))
        }).catch(err => toast.update(ts, {
            render: err.response.data.error,
            type: "error",
            isLoading: false,
            autoClose: 1500
        }))
    }

    return (
        <Modal>
            <form onSubmit={confirm}>
                <Input configure={{
                    maxLength: 6,
                    minLength: 6,
                    placeholder: "code",
                    onInput: e => setValue(e.target.value),
                    value: value,
                    className: "input"
                }}/>
                <Button configure={{
                    className: "button is_fullwidth is_orange",
                }} typograph={"Send"}/>
            </form>
        </Modal>
    )
}

export function getServerSideProps() {

    return {
        props: {}
    }
}

export default Index;