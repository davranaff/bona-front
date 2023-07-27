import axios from "axios"

axios.defaults.headers.common["Sec-Fetch-Mode"] = "cors"

export const API_URL = "https://bonafresco79.pythonanywhere.com"
// export const API_URL = "http://localhost:8000"

export const HOME = "/api/app/home"
export const PRODUCTS = "/api/app/products"
export const CATEGORIES = "/api/app/categories"
export const SUBCATEGORIES = "/api/app/subcategories"
export const PROMO = "/api/app/promo"
export const BASKET = "/api/app/basket"
export const BASKET_TOTAL = "/api/app/basket-total"
export const ORDER = "/api/app/order"
export const DELIVERY_COUNTRIES = "/api/app/delivery-countries"
export const WISHLIST = "/api/app/wishlist"

export const REGISTRATION = "/api/users/auth/register"
export const LOGIN = "/api/users/auth/login"
export const VERIFY_EMAIL = "/api/users/auth/verify"
export const RESET_PASSWORD = "/api/users/auth/reset-password"
export const RESET_PASSWORD_WITH_EMAIL = "/api/users/auth/reset-password-with-email"
export const PROFILE = "/api/users/profile"