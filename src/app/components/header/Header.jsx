import React, {useContext} from 'react';
import './header.css'
import {Splide, SplideSlide} from "@splidejs/react-splide";
import '@splidejs/react-splide/css';
import Button from "@/app/UI/button/Button";
import {AiOutlineHeart} from "react-icons/ai";
import Input from "@/app/UI/input/Input";
import {API_URL, BASKET, PRODUCTS, API_URL_MEDIA} from "@/app/services/api/consts";
import {useRouter} from "next/navigation";
import {Pages} from "@/app/router/routes";
import {BaseContext} from "@/pages/_app";
import {toast} from "react-toastify";
import axios from "axios";
import {UpdateContext} from "@/app/App";

function Header(props) {
    return (
        <div className={'header__content'}>
            <Splide options={{
                perPage: 1,
                pagination: false,
                autoplay: true,
                interval: 3000,
                type: "loop",
                rewind: true,
                speed: 1000
            }}>
                {props.banner && props.banner.map(value => <SplideSlide key={value.id}>
                    <HeaderItem value={value}/>
                </SplideSlide>)}
            </Splide>
        </div>
    );
}

function HeaderItem({value}) {
    const route = useRouter()
    const {activeUser} = useContext(BaseContext)
    const {setUpdate, setSearch} = useContext(UpdateContext)

    function goToProduct() {
        route.push(Pages.product + value.product.id)
    }

    async function addCart() {
        if (activeUser) {
            const ts = toast.loading("please wait...")
            await axios.post(API_URL + BASKET, {
                product_id: value.product.id,
                quantity: 1
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

    async function like() {
    }

    async function search(param) {
        if (param) {
            await axios.get(API_URL + PRODUCTS + `?search=${param}`, {
                headers: localStorage.getItem("token") && {
                    Authorization: `Token ${localStorage.getItem("token")}`
                }
            })
                .then(res => setSearch(res.data.data))
                .catch(err => _)
            return
        }
        setSearch(null)
    }

    return (
        <div className={"header__content_item"} style={{backgroundImage: `url(${API_URL_MEDIA + value.image})`}}>
            <div className={"header__content_item__left"}>
                <h1>Get groceries</h1>
                <h2>Delivered to You</h2>
                <Input configure={{
                    className: "input",
                    placeholder: "write product name or code",
                    onInput: e => search(e.target.value)
                }}/>
                <div className={"header__content_item__buttons"}>
                    <Button configure={{
                        className: "button is_orange",
                        style: {fontWeight: "600"},
                        onClick: addCart,
                    }} typograph={"ADD TO CART"}/>
                    {/*<Button configure={{*/}
                    {/*    className: "button is_orange",*/}
                    {/*    onClick: like,*/}
                    {/*}} typograph={<AiOutlineHeart/>}/>*/}
                </div>
            </div>
            <div className={"header__content_item__info"} onClick={goToProduct}>
                <p>{value.product.name}</p>
                <p>{value.product.description.slice(0, 30)}...</p>
                <div className={"cube"}></div>
            </div>
        </div>
    )
}

export default Header;