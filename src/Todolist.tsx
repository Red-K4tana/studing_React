import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import s from "./components/Input.module.css";
import tl from './TodoList.module.css';
import {TasksType} from './App'



type TodolistPropsType = {
    todoList_id: string
    todoListTitle: string
    tasks: Array<TasksType>
    removeTaskItem:(todoList_id: string, itemId: string)=>void
    setFilter:(todoList_id: string, value: FilterValuesType)=>void
    addTask: (todoList_id: string, title: string)=>void
    changeStatus: (todoList_id: string, itemId: string, value: boolean)=> void
    filter: string
    removeTodoList: (todoList_id: string) => void
}
type error = boolean | null

export const TodoList = (props: TodolistPropsType) => {
    const [error, setError] = useState<error>(null)
    const [title, setTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false)
        console.log(title)
    }
    const addTaskHandler = () => { //кнопка Add
        if (title.trim()) { //не даст отправить пустую строку
            props.addTask(props.todoList_id, title.trim()) //обрежет все пробелы по краям
            setTitle('')
        } else {
            setError(true)
        }
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => { //нажатие на Enter
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    const tsarChangeFilter = (event: FilterValuesType) => { //кнопки фильтра
        props.setFilter(props.todoList_id, event)
    }
    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>, itemId: string)=> {
        props.changeStatus(props.todoList_id, itemId, event.currentTarget.checked)
    }
//--------------------------------------------------------------------------------------------------------
    return (
        <div>
            <div>
                <div className={tl.titleTodoList}>
                    <h3>{props.todoListTitle}</h3>
                    <Button name={'RemoveTL'} callback={()=>props.removeTodoList(props.todoList_id)}/>
                </div>
                <div>
                    <Input value={title} onChangeHandler={onChangeHandler} onKeyPressHandler={onKeyPressHandler} error={error}/>
                    <Button name={'Add item'} callback={()=>addTaskHandler()} />
                    {error && <div className={s.emptyInputText}>Алярма!!!</div>}
                </div>
                <ul>
                    {props.tasks.map(m => {
                            return (
                                <li key={m.id} className={m.isDone ? s.activeTask : ''}>
                                    <Button name={'X'} callback={()=>props.removeTaskItem(props.todoList_id, m.id)}/>
                                    <input type="checkbox" onChange={(event)=>onChangeStatusHandler(event, m.id)} checked={m.isDone}/>
                                    <span>{m.title}</span>
                                </li>
                            )
                        }
                    )
                    }
                </ul>
                <div>
                    <Button color={props.filter==='All' ? s.activeFilter : ''} name={'All'} callback={()=>tsarChangeFilter('All')}/>
                    <Button color={props.filter==='Active' ? s.activeFilter : ''} name={'Active'} callback={()=>tsarChangeFilter('Active')}/>
                    <Button color={props.filter==='Completed' ? s.activeFilter : ''} name={'Completed'} callback={()=>tsarChangeFilter('Completed')}/>
                </div>
            </div>
        </div>
    )
}

