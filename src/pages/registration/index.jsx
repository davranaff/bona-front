import React, {useContext, useState} from 'react';
import './registration.css'
import Input from "@/app/UI/input/Input";
import Button from "@/app/UI/button/Button";
import axios from "axios";
import {API_URL, REGISTRATION} from "@/app/services/api/consts";
import {toast} from "react-toastify";
import {BaseContext} from "@/pages/_app";
import {useRouter} from "next/navigation";
import {Pages} from "@/app/router/routes";

function Index(props) {
    const [username, setUsername] = useState("")
    const [telephone, setTelephone] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const {setUserState} = useContext(BaseContext)
    const route = useRouter()

    async function handleSubmit(event) {
        event.preventDefault()
        if (password !== confirm) {
            toast.error("password mismatch")
            return
        }
        const toastId = toast.loading("please wait...")
        await axios.post(API_URL + REGISTRATION, {
            email,
            password,
            name: username,
            telephone,
        }).then(res => {
            setUserState(res.data.data.user)
            localStorage.setItem("token", res.data.data.token)
            localStorage.setItem("user", JSON.stringify(res.data.data.user))
            toast.update(toastId, {render: "you have registered", type: "success", isLoading: false, autoClose: 1500})
            route.push("/login")
        }).catch(err => {
            toast.update(toastId, {render: err.response.data.error, type: "error", isLoading: false, autoClose: 1500})
        })
    }

    return (
        <section className={"registration__container"}>
            <h1>Registration</h1>
            <form className={"registration__container_body"} onSubmit={handleSubmit}>
                <Input configure={{
                    onInput: e => setUsername(e.target.value),
                    value: username,
                    type: "text",
                    minLength: 3,
                    required: true,
                    className: "input",
                    placeholder: "username"
                }}/>
                <Input configure={{
                    onInput: e => setTelephone(e.target.value),
                    value: telephone,
                    type: "text",
                    minLength: 8,
                    required: true,
                    className: "input",
                    placeholder: "telephone"
                }}/>
                <Input configure={{
                    onInput: e => setEmail(e.target.value),
                    value: email,
                    type: "email",
                    minLength: 8,
                    required: true,
                    className: "input",
                    placeholder: "email"
                }}/>
                <div className={"registration__passwords"}>
                    <Input configure={{
                        onInput: e => setPassword(e.target.value),
                        value: password,
                        type: "password",
                        minLength: 8,
                        required: true,
                        className: "input",
                        placeholder: "password"
                    }}/>
                    <Input configure={{
                        onInput: e => setConfirm(e.target.value),
                        value: confirm,
                        type: "password",
                        minLength: 8,
                        required: true,
                        className: "input",
                        placeholder: "confirm password"
                    }}/>
                </div>
                <Button configure={{
                    className: "button is_fullwidth is_orange",
                }} typograph={"Registration"}/>
                <Button configure={{
                    className: "button is_fullwidth",
                    type: "button",
                    style: {marginTop: "5px"},
                    onClick: _ => route.push(Pages.login)
                }} typograph={"Login"}/>
            </form>
        </section>
    );
}

export default Index;