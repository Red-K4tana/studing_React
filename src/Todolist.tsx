import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";
import {Input} from "./components/Input";
import s from "./components/Input.module.css";
import tl from './TodoList.module.css'
import {TasksType} from "./App";
import AddItemForm from "./components/AddItemForm";

type TodolistPropsType = {
    todoListID: string
    todoListTitle: string
    tasks: Array<TasksType>
    removeTaskItem: (todoListID: string, itemId: string) => void
    changeFilter: (todoListID: string, value: FilterValuesType) => void
    addTask: (todoListID: string, title: string) => void
    changeTaskStatus: (todoListID: string, itemId: string, value: boolean) => void
    filter: string
    removeTodoList: (todoListID: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    /*const [error, setError] = useState<error>(null)
    const [title, setTitle] = useState('')

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
        setError(false)
        console.log(title)
    }
    const addTaskHandler = () => { //кнопка Add
        if (title.trim()) { //не даст отправить пустую строку
            props.addTask(props.todoListID, title.trim()) //обрежет все пробелы по краям
            setTitle('')
        } else {
            setError(true)
        }
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => { //нажатие на Enter
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }*/
    const tsarChangeFilter = (event: FilterValuesType) => { //кнопки фильтра
        props.changeFilter(props.todoListID, event)
    }
    const onChangeStatusHandler = (itemId: string, event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.todoListID, itemId, event.currentTarget.checked)
    }
    const addTask = (title: string) => {
        props.addTask(props.todoListID, title)
    }

    return (
        <div>
            <div>
                <div className={tl.titleTodoList }>
                    <h3>{props.todoListTitle}</h3>
                    <Button name={'RemoveTL'} callback={() => props.removeTodoList(props.todoListID)}/>
                </div>
                <div>
                    <AddItemForm addItem={addTask}/>
                    {/*<Input value={title}
                           onChangeHandler={onChangeHandler}
                           onKeyPressHandler={onKeyPressHandler}
                           error={error}/>
                    <Button name={'Add task'} callback={() => addTaskHandler()}/>
                    {error && <div className={s.emptyInputText}>Алярма!!!</div>}*/}
                </div>
                <ul>
                    {props.tasks.map(m => {
                            return (
                                <li key={m.id} className={m.isDone ? s.activeTask : ''}>
                                    <Button name={'X'}
                                            callback={() => props.removeTaskItem(props.todoListID, m.id)}/>
                                    <input type="checkbox" onChange={(event) => onChangeStatusHandler(m.id, event)}
                                           checked={m.isDone}/>
                                    <span>{m.title}</span>
                                </li>
                            )
                        }
                    )
                    }
                </ul>
                <div>
                    <Button color={props.filter === 'All' ? s.activeFilter : ''} name={'All'}
                            callback={() => tsarChangeFilter('All')}/>
                    <Button color={props.filter === 'Active' ? s.activeFilter : ''} name={'Active'}
                            callback={() => tsarChangeFilter('Active')}/>
                    <Button color={props.filter === 'Completed' ? s.activeFilter : ''} name={'Completed'}
                            callback={() => tsarChangeFilter('Completed')}/>
                </div>
            </div>
        </div>
    )
}

