import React, {useContext, useEffect} from 'react'
import {AuthContext} from "../../../context/AuthContext";
import { useHistory } from 'react-router-dom'
import {useFormik} from "formik";
import {useApi} from "../../../hooks/api.hook";
import {useMessage} from "../../../hooks/message.hook";
import Logo from '../../../assets/images/Logo.png'
import TodoLogo from '../../../assets/images/TodoLogo.png'
import s from './SignInPage.module.css'

export const SignInPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const history = useHistory()
    const {loading, error, request, clearError} = useApi()


    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const signUpRedirect = () => {
        history.push('/signUp')
    }

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                const data = await request('todoApi/auth/login', 'POST', {...values})
                auth.login(data.token, data.userId)
            } catch (e) {
            }
        },
    });
    return (
        <div className={s.container}>
            <div className={s.auth_card}>
                <div className={s.auth_card_header}>
                    <img src={TodoLogo} alt=""/>
                </div>
                <form className={s.auth_card_content} onSubmit={formik.handleSubmit}>
                    <div className={s.card_content_header}>
                        <span>Авторизация</span>
                    </div>
                    <div className={s.card_content}>
                        <input id="email"
                               name="email"
                               type="text"
                               placeholder="Электронная почта"
                               onChange={formik.handleChange}
                               value={formik.values.email}
                        />
                        <input id="password"
                               name="password"
                               type="text"
                               placeholder="Пароль"
                               onChange={formik.handleChange}
                               value={formik.values.password}
                        />
                    </div>
                    <div className={s.card_content_action}>
                        <button type="submit">Войти с помощью <img src={Logo} alt=""/></button>
                        <button onClick={signUpRedirect}>Зарегистрироваться</button>
                    </div>
                </form>
                <div className={s.auth_card_footer}>

                </div>
            </div>
        </div>
    );
}