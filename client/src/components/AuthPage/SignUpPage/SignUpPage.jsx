import React, {useContext, useEffect} from 'react'
import {AuthContext} from "../../../context/AuthContext";
import {useFormik} from "formik";
import {useApi} from "../../../hooks/api.hook";
import {useMessage} from "../../../hooks/message.hook";
import {useHistory} from 'react-router-dom'
import s from './SignUpPage.module.css'
import logo from '../../../Logo.png'
import TodoLogo from "../../../assets/images/TodoLogo.png";
import Logo from "../../../assets/images/Logo.png";

export const SignUpPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const history = useHistory()
    const {loading, error, request, clearError, success} = useApi()


    useEffect(() => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                const data = await request('todoApi/auth/register', 'POST', {...values})
                if (data.message === "Пользователь создан"){
                    history.push('/todos')
                }
            }catch (e) {}
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
                        <span>Регистрация</span>
                    </div>
                    <div className={s.card_content}>
                        <input id="name"
                               name="name"
                               type="text"
                               placeholder="Имя пользователя"
                               onChange={formik.handleChange}
                               value={formik.values.name}
                        />
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
                        <button type="submit">Зарегистрироваться</button>
                        <button  onClick={() => { history.push('/signIn') }}>Войти с помощью <img src={Logo} alt=""/></button>
                    </div>
                </form>
                <div className={s.auth_card_footer}>

                </div>
            </div>
        </div>
    );
}