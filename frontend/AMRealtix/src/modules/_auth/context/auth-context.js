import React, { createContext, useState, useContext, useEffect } from 'react'
import Router, { useRouter } from 'next/router'
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import axios from 'axios'
import { Route } from '@mui/icons-material';
import { set } from 'nprogress';

const baseApiUrl = process.env.NEXT_PUBLIC_REACT_APP_API_URL;

const SECRET_KEY = process.env.JWT_KEY;

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token')
            if (token) {
                console.log("Got a token in the cookies, let's see if it is valid")
                axios.defaults.headers.Authorization = `Bearer ${token}`

                //get user data
                //const { data: user } = await axios.get('users/me')
                setUser(true)
            }
            setUser(false);
            setLoading(false);
        }
        loadUserFromCookies()
    }, [])

    const changePassword = async (data) => {
        console.log('Change Password', data);
        return await axios.post(`${baseApiUrl}api/user/changePassword`, data)
    }

    const login = async (data) => {

        console.log('login env', data)
        await axios.post(`${baseApiUrl}api/user/login`, data).then((response) => {
            if(response?.data?.token){
            console.log("Got token", response?.data?.token)
            Cookies.set('token', response?.data?.token, { expires: 60 })
            localStorage.setItem('profile',JSON.stringify({ name: response?.data?.name, userId: response?.data?.userPkId}))
            axios.defaults.headers.Authorization = `Bearer ${response?.data?.token}`
            setUser(true)
            Router.push('/admin/dashboard');
            console.log("Got user", user)
            }
        })
            .catch((error) => {

            })
    }

    const logout = (email, password) => {
        Cookies.remove('token')
        setUser(false)
        delete axios.defaults.headers.Authorization
        window.location.pathname = '/'
    }


    const verifyToken = (jwtToken) => {
        try {
            return jwt.verify(jwtToken, SECRET_KEY);
        } catch (e) {
            console.log('e:', e);
            return null;
        }
    }

    const getAppCookies = (req) => {
        const parsedItems = {};
        if (req.headers.cookie) {
            const cookiesItems = req.headers.cookie.split('; ');
            cookiesItems.forEach(cookies => {
                const parsedItem = cookies.split('=');
                parsedItems[parsedItem[0]] = decodeURI(parsedItem[1]);
            });
        }
        return parsedItems;
    }

    const absoluteUrl = (req, setLocalhost) => {
        var protocol = 'https:';
        var host = req
            ? req.headers['x-forwarded-host'] || req.headers['host']
            : window.location.host;
        if (host.indexOf('localhost') > -1) {
            if (setLocalhost) host = setLocalhost;
            protocol = 'http:';
        }
        return {
            protocol: protocol,
            host: host,
            origin: protocol + '//' + host,
            url: req,
        };
    }

    return (
        <AuthContext.Provider
            value={{
                absoluteUrl,
                isAuthenticated: user,
                user,
                login,
                loading,
                logout,
                verifyToken,
                getAppCookies,
                changePassword
            }}>
            {children}
        </AuthContext.Provider>
    )

}

export const ProtectRoute = ({ children, ignoreAuth, isLogin }) => {
    console.log(isLogin);
    const { isAuthenticated, isLoading } = useAuth();

    const { pathname } = useRouter();

    useEffect(() => {
        if (isAuthenticated && isLogin) {
            Router.push("/admin/dashboard")
        }

        if(!isAuthenticated && !isLogin){
            Router.push("/")
        }

        if(!isAuthenticated && isLogin){
            Router.push("/admin")
        }

    }, [])

    return (isLogin || isAuthenticated || ignoreAuth) && children;

};

export const useAuth = () => useContext(AuthContext)



