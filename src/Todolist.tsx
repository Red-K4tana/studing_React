import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    /*changeFilter: (value: FilterValuesType) => void*/
    addTask: (title: string)=> void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')
    console.log(title)
    //-------------------------------------------------
    const addTaskHandler = () => {
        props.addTask(title)
        setTitle('') // изучить почему пропадает!!!!!!!
    }
    //-------------------------------------------------
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>)=> { //ЗАПОМНИТЬ ТИП event !!!!!!!
        setTitle(event.currentTarget.value)
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }

/*    const changeFilterAllHandler = () => {
        props.changeFilter('all')
    }
    const changeFilterActiveHandler = () => {
        props.changeFilter('active')
    }
    const changeFilterCompletedHandler = () => {
        props.changeFilter('completed')
    }*/

    const tsarChangeFilterHandler = (value: FilterValuesType) => {
        /*props.*/changeFilter(value)
    }
    const removeTaskHandler = (itemId: string) => {
        props.removeTask(itemId)
    }

    //========================================================================
    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = props.tasks;

    if (filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.isDone === true);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }
    //========================================================================

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeHandler} onKeyPress={onKeyPressHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {
                tasksForTodolist.map(t => <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title}</span>
                    <button onClick={ () => removeTaskHandler(t.id) }>x</button>
                </li>)
            }
        </ul>
        <div>
            <button onClick={ ()=>tsarChangeFilterHandler('all') }>
                All
            </button>
            <button onClick={ ()=>tsarChangeFilterHandler('active') }>
                Active
            </button>
            <button onClick={ ()=>tsarChangeFilterHandler('completed') }>
                Completed
            </button>

            {/*<button onClick={changeFilterAllHandler}>
                All
            </button>
            <button onClick={changeFilterActiveHandler}>
                Active
            </button>
            <button onClick={changeFilterCompletedHandler}>
                Completed
            </button>*/}
        </div>
    </div>
}
