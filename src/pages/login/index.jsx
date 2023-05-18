import React, {useContext, useState} from 'react';
import "./login.css"
import Input from "@/app/UI/input/Input";
import Button from "@/app/UI/button/Button";
import {API_URL, LOGIN, RESET_PASSWORD, RESET_PASSWORD_WITH_EMAIL} from "@/app/services/api/consts";
import {toast} from "react-toastify";
import axios from "axios";
import {BaseContext} from "@/pages/_app";
import {useRouter} from "next/navigation";
import Modal from "@/app/components/modal/Modal";
import {Pages} from "@/app/router/routes";

function Index(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {setActiveUser, setShowModal} = useContext(BaseContext)
    const route = useRouter()

    async function handleSubmit(event) {
        event.preventDefault()
        const toastId = toast.loading("please wait...")
        await axios.post(API_URL + LOGIN, {
            email,
            password
        }, {
            headers: {
                Authorization: `Token ${localStorage.getItem("token")}`
            }
        }).then(res => {
            localStorage.setItem("token", res.data.data)
            localStorage.setItem("active", JSON.stringify(true))
            setActiveUser(true)
            document.cookie = `token=${res.data.data}`
            toast.update(toastId, {
                render: "you are logged into your account",
                type: "success",
                isLoading: false,
                autoClose: 1500
            })
            route.push(Pages.home)
        }).catch(err => {
            toast.update(toastId, {render: err.response.data.error, type: "error", isLoading: false, autoClose: 1500})
        })
    }


    return (
        <section className={"login__container"}>
            <h1>Login</h1>
            <form className={"login__container_body"} onSubmit={handleSubmit}>
                <Input configure={{
                    onInput: e => setEmail(e.target.value),
                    value: email,
                    required: true,
                    placeholder: "email",
                    type: "email",
                    className: "input",
                    minLength: 5,
                }}/>
                <Input configure={{
                    onInput: e => setPassword(e.target.value),
                    value: password,
                    required: true,
                    placeholder: "password",
                    type: "password",
                    className: "input",
                    minLength: 8
                }}/>
                <Button configure={{
                    className: "button is_fullwidth is_orange"
                }} typograph={"Login"}/>
                <Button configure={{
                    className: "button is_fullwidth",
                    style: {marginTop: '5px'},
                    type: "button",
                    onClick: _ => route.push(Pages.registration)
                }} typograph={"Registration"}/>
                <p className={"forgot"} onClick={_ => {
                    setShowModal(true)
                }}>Forgot your password?</p>
            </form>
            <Reset setShowModal={setShowModal}/>
        </section>
    );
}

function Reset({setShowModal}) {
    const [code, setCode] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [showNextBlock, setShowNextBlock] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        if (showNextBlock) {
            const ts = toast.loading("wait please...")
            if (password === newPassword) {
                await axios.post(API_URL + RESET_PASSWORD, {
                    email_code: code,
                    password
                }).then(res => {
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
            }
            return
        }
        await axios.post(API_URL + RESET_PASSWORD_WITH_EMAIL, {
            email
        }).then(res => {
            setShowNextBlock(true)
            toast.success("code has been sent to your email")
        })
            .catch(err => toast.error(err.response.data.error))
    }

    return (
        <Modal>
            <form onSubmit={handleSubmit}>
                {!showNextBlock && <Input configure={{
                    required: true,
                    className: "input",
                    type: "email",
                    placeholder: "email",
                    value: email,
                    minLength: 6,
                    onInput: e => setEmail(e.target.value)
                }}/>}
                {showNextBlock && <>
                    <Input configure={{
                        required: true,
                        className: "input",
                        type: "text",
                        placeholder: "code",
                        value: code,
                        minLength: 6,
                        maxLength: 6,
                        onInput: e => setCode(e.target.value)
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
                </>}
                {showNextBlock ? <Button typograph={"Reset Password"} configure={{
                    className: "button is_fullwidth is_orange",
                }}/> : <Button typograph={"get code"} configure={{
                    className: "button is_fullwidth is_orange",
                }}/>}
            </form>
        </Modal>
    )
}

export default Index;