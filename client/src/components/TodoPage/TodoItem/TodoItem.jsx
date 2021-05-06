import React, {useState} from 'react'
import s from '../TodoPage.module.css'
import Delete from "../../../assets/images/Vector.png";

export const TodoItem = ({item, deleteItem, isCompleted, updateTodo, todos, currentItem, setCurrentItem}) => {


    const dragStartHandler = (e, item) => {
        setCurrentItem(item)
    }


    const dragEndHandler = (e) => {
    }

    const dragOverHandler = (e) => {
        e.preventDefault()
    }

    const dropHandler = (e, item) => {
        e.preventDefault()
        todos.map((i) => {
            if (i._id === item._id){
                const newObject = {...i, order: currentItem.order}
                updateTodo(newObject._id, "order", newObject.order)
                // return newObject
            }
            if(i._id === currentItem._id){
                const newObject = {...i, order: item.order}
                updateTodo(newObject._id, "order", newObject.order)
                // return newObject
            }
            // return i
        })
    }

    return (
        <>
            <div className={s.add_todo + " " + s.todo_items_item}
                 onDragStart={ (e) => { dragStartHandler(e, item) } }
                 onDragLeave={ (e) => { dragEndHandler(e) } }
                 onDragEnd={ (e) => { dragEndHandler(e) } }
                 onDragOver={ (e) => { dragOverHandler(e) } }
                 onDrop={ (e) => { dropHandler(e, item) } }
                 draggable={true}
            >
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