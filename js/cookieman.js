import Cookies from './js.cookie.mjs'

function setCookie(k, v) {
    Cookies.set(k, v)
}

function getCookie(k) {
    return Cookies.get(k)
}