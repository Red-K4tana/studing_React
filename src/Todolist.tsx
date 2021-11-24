import React, {ChangeEvent,KeyboardEvent, useState} from "react";
import {filterValuesType} from "./App";
import {Button} from "./components/Button";
import {Input} from "./components/Input";

type TasksPropsType = {
    id: string,
    title: string,
    isDone: boolean
}
type TodolistPropsType = {
    title: string,
    tasks: Array<TasksPropsType>
    removeTaskItem:(itemId: string)=>void
    setFilter:(value: filterValuesType)=>void
    addTask: (title: string)=>void
}
export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        console.log(title)
    }
    const addTaskHandler = () => { //кнопка Add
        props.addTask(title)
        setTitle('')
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => { //нажатие на Enter
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

    const tsarChangeFilter = (event: filterValuesType) => { //кнопки фильтра
        props.setFilter(event)
    }

    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <div>
                    {/*<input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>*/}
                    <Input value={title} onChangeHandler={onChangeHandler} onKeyPressHandler={onKeyPressHandler}/>
                    <Button name={'Add item'} callBack={()=>addTaskHandler()} />
                </div>
                <ul>
                    {props.tasks.map(m => {
                            return (
                                <li key={m.id}>
                                    <Button name={'X'} callBack={()=>props.removeTaskItem(m.id)}/>
                                    <input type="checkbox" checked={m.isDone}/>
                                    <span>{m.title}</span>
                                </li>
                            )
                        }
                    )
                    }
                </ul>
                <div>
                    {/*<button onClick={()=> tsarChangeFilter('All')}>All</button>
                    <button onClick={()=> tsarChangeFilter('Active')}>Active</button>
                    <button onClick={()=> tsarChangeFilter('Completed')}>Completed</button>*/}

                    <Button name={'All'} callBack={()=>tsarChangeFilter('All')}/>
                    <Button name={'Active'} callBack={()=>tsarChangeFilter('Active')}/>
                    <Button name={'Completed'} callBack={()=>tsarChangeFilter('Completed')}/>
                </div>
            </div>
        </div>
    )
}

