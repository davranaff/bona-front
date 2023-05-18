import React, {useContext} from 'react';
import './navbar.css'
import Link from "next/link";
import {AiOutlineHeart} from "react-icons/ai";
import {HiOutlineShoppingCart} from "react-icons/hi"
import {MdAccountCircle} from 'react-icons/md'
import {Pages} from "@/app/router/routes";
import {BaseContext} from "@/pages/_app";
import {BiLogIn, BiRegistered} from "react-icons/bi";

function Navbar(props) {
    const {activeUser} = useContext(BaseContext)

    return (
        <nav className={'navbar__container'}>
            <div className={'navbar__buttons'}>
                {activeUser ? <>
                    <Link href={Pages.profile} className={'navbar__buttons-item'}>
                        <MdAccountCircle/>
                        <span>My Account</span>
                    </Link>
                    <Link href={Pages.wishlist} className={'navbar__buttons-item'}>
                        <AiOutlineHeart/>
                        <span>My Wishlist</span>
                    </Link>
                    <Link href={Pages.cart} className={'navbar__buttons-item'}>
                        <HiOutlineShoppingCart/>
                        <span>{props.total} AED / {props.count}</span>
                    </Link>
                </> : <>
                    <Link href={Pages.registration} className={'navbar__buttons-item'}>
                        <BiRegistered/>
                        <span>Registration</span>
                    </Link>
                    <Link href={Pages.login} className={'navbar__buttons-item'}>
                        <BiLogIn/>
                        <span>Login</span>
                    </Link>
                </>}
            </div>
            <div className={'navbar__content'}>
                <Link href={Pages.home}><img src="/icons/logo.png" alt=""/></Link>
                <Link href={Pages.home}>Home</Link>
                <Link href={Pages.shop}>Shop</Link>
                <Link href={Pages.about}>About</Link>
                <Link href={Pages.promo}>Promo</Link>
                <Link href={Pages.products}>All Products</Link>
            </div>
        </nav>
    );
}

export default Navbar;