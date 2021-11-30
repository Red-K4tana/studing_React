import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {filterValuesType} from "./App";
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import s from "./components/Input.module.css";

/*import {FullInput} from "./components/FullInput";*/

type TasksPropsType = {
    id: string,
    title: string,
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTaskItem:(itemId: string)=>void
    setFilter:(value: filterValuesType)=>void
    addTask: (title: string)=>void
    changeStatus: (value: boolean, itemId: string)=> void
    filter: string
}
type error = boolean | null

export const Todolist = (props: TodolistPropsType) => {
    const [error, setError] = useState<error>(null)
    const [title, setTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false)
        console.log(title)
    }
    const addTaskHandler = () => { //кнопка Add
        if (title.trim()) { //не даст отправить пустую строку
            props.addTask(title.trim()) //обрежет все пробелы по краям
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
    const tsarChangeFilter = (event: filterValuesType) => { //кнопки фильтра
        props.setFilter(event)
    }
    const onChangeStatusHandler = (event: ChangeEvent<HTMLInputElement>, itemId: string)=> {
        props.changeStatus(event.currentTarget.checked, itemId)
    }

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    <Input value={title} onChangeHandler={onChangeHandler} onKeyPressHandler={onKeyPressHandler} error={error}/>
                    <Button color={''} name={'Add item'} callback={()=>addTaskHandler()} />
                    {error && <div className={s.emptyInputText}>Алярма!!!</div>}
                </div>
                <ul>
                    {props.tasks.map(m => {
                            return (
                                <li key={m.id} className={m.isDone ? s.activeTask : ''}>
                                    <Button color={''} name={'X'} callback={()=>props.removeTaskItem(m.id)}/>
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

