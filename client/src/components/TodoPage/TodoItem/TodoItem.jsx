import React from 'react'
import s from '../TodoPage.module.css'
import Delete from "../../../assets/images/Vector.png";

export const TodoItem = ({item, deleteItem, isCompleted, updateTodo}) => {
    return (
        <>
            <div className={s.add_todo + " " + s.todo_items_item}>
                <div className={s.todo_left}>
                    <button className={isCompleted === true ? s.check_todo + " " + s.active : s.check_todo} onClick={() => {updateTodo(item._id, "isCompleted", !isCompleted)}}>
                    </button>
                    <div className={s.text_todo}>
                        <span>{item.title}</span>
                    </div>
                </div>
                <div className={s.close_todo}>
                    <img src={Delete} onClick={() => {deleteItem(item._id)}} alt=""/>
                </div>
            </div>
        </>
    )
}