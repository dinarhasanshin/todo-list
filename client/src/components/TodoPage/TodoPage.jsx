import React, {useContext, useEffect, useState} from 'react'
import {useFormik} from "formik";
import {TodoItem} from "./TodoItem/TodoItem";
import s from './TodoPage.module.css'
import {AuthContext} from "../../context/AuthContext";
import {useApi} from "../../hooks/api.hook";
import TodoLogo from '../../assets/images/TodoLogo.png'
import Exit from '../../assets/images/Frame 2.png'
import {updateObjectInArray} from "../../utils/object-helpers";

export const TodoPage = () => {
    const {userId, token, isCompleted, logout} = useContext((AuthContext))
    const {request, loading} = useApi()
    const [todos, setTodos] = useState([])
    const [currentItem, setCurrentItem] = useState(null)
    
    const deleteItem = async (todoId) => {
        if (todoId) {
            const data = await request('todoApi/todo/delete', 'POST', {todoId}, {
                Authorization: `Bearer ${token}`
            })
            setTodos(todos.filter(item => item._id !== data._id))
        }
    }

    const updateTodo = async (todoId, field, value) => {
        const data = await request('todoApi/todo/update', 'POST', {todoId, field, value}, {
            Authorization: `Bearer ${token}`
        })
        //Временное решение
        const data_ = await request('todoApi/todo/', 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setTodos(data_)
        //TODO Решить проблему с обновление элемента в массие при перетаскивании
        // setTodos(updateObjectInArray(todos, data, '_id'))
    }
    const sortItems = (a,b) => {
        if (a.order > b.order){
            return 1
        }else{
            return -1
        }
    }

    useEffect(async () => {
        const data = await request('todoApi/todo/', 'GET', null, {
            Authorization: `Bearer ${token}`
        })
        setTodos(data)
    }, [request, token])

    const formik = useFormik({
        initialValues: {
            title: '',
        },
        onSubmit: async (values) => {
            const data = await request('todoApi/todo/create', 'POST', {title: values.title, owner: userId}, {
                Authorization: `Bearer ${token}`
            })
            values.title = ''
            setTodos([...todos, data.todo])
        },
    });

    return (
        <div className={s.container}>
            <header>
                <div className={s.logo}>
                    <img src={TodoLogo} alt=""/>
                </div>
                <div className={s.exit}>
                    <img src={Exit} onClick={() => { logout() }} alt=""/>
                </div>
            </header>
            <section className={s.todo_items}>
                <form onSubmit={formik.handleSubmit} className={s.add_todo + " " + s.todo_shadow}>
                    <div className={s.check_todo}></div>
                    <input
                        id="title"
                        name="title"
                        placeholder="Введите вашу заметку"
                        className={s.text_todo}
                        onChange={formik.handleChange}
                        value={formik.values.title}
                    />
                </form>
                <div className={s.todo_container}>
                    {
                        todos.sort(sortItems).map((item, index) => {
                            return <TodoItem key={index} item={item} deleteItem={deleteItem} isCompleted={item.isCompleted}
                                             updateTodo={updateTodo} setTodos={setTodos} todos={todos} currentItem={currentItem}
                                             setCurrentItem={setCurrentItem}/>
                        })
                    }
                </div>
            </section>
        </div>
    );
}