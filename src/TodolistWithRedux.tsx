import React, {ChangeEvent} from "react";
import {FilterValuesType} from "./App";
import {Button} from "./components/Button";
import s from "./components/Input.module.css";
import tl from './Todolist.module.css'
import {TasksType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditableSpan} from "./components/EditableSpan";
import {useDispatch, useSelector} from "react-redux";
import {ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC} from "./Redux/todolists-reducer";
import {addTaskItemAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskItemAC} from "./Redux/tasks-reducer";
import {AppRootStateType} from "./Redux/store";
import {TodolistsType} from "./AppWithRedux";

type TodolistPropsType = {
    todolistID: string
}

export const TodolistWithRedux = (props: TodolistPropsType) => {
    const todolist = useSelector<AppRootStateType, TodolistsType>(state => state.todolists
        .filter(tl => tl.id === props.todolistID)[0])
    const tasks = useSelector<AppRootStateType, Array<TasksType>>(state => state.tasks[todolist.id]);
    const dispatch = useDispatch();

    const tsarChangeFilter = (filter: FilterValuesType) => { //кнопки фильтра
        dispatch(ChangeTodolistFilterAC(todolist.id, filter))
    }
    const changeTodolistTitle = (newTitle: string) => {
        dispatch(ChangeTodolistTitleAC(todolist.id, newTitle))
    }
    const removeTodolist = (todolistID: string) => {
        dispatch(RemoveTodolistAC(todolistID))
    }
    const onChangeStatusHandler = (taskId: string, event: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeTaskStatusAC(todolist.id, taskId, event.currentTarget.checked))
    }
    const removeTaskItem = (todolistID: string, taskID: string) => {
        dispatch(removeTaskItemAC(todolistID, taskID))
    }
    const addTask = (newTitle: string) => {
        dispatch(addTaskItemAC(todolist.id, newTitle))
    }
    //-------------------------------------------------------------------------------------------
    let tasksAfterFilter = tasks;
    if (todolist.filter === 'Active') {
        tasksAfterFilter = tasks.filter(task => !task.isDone)
    }
    if (todolist.filter === 'Completed') {
        tasksAfterFilter = tasks.filter(task => task.isDone)
    }
    //-------------------------------------------------------------------------------------------
    const tasksJSX = tasksAfterFilter.map(task => {
            const changeTaskTitle = (newTitle: string) => {
                dispatch(changeTaskTitleAC(todolist.id, task.id, newTitle))
            }
            return (
                <li key={task.id} className={task.isDone ? s.activeTask : ''}>
                    <Button name={'X'}
                            callback={() => removeTaskItem(todolist.id, task.id)}/>
                    <input type="checkbox" onChange={(event) => onChangeStatusHandler(task.id, event)}
                           checked={task.isDone}/>
                    <EditableSpan title={task.title} changeTitle={changeTaskTitle}/>
                </li>
            )
        }
    )
    //-------------------------------------------------------------------------------------------

    return (
        <div>
            <div>
                <div className={tl.titleTodolist}>
                    <EditableSpan title={todolist.title} changeTitle={changeTodolistTitle}/>
                    <Button name={'RemoveTL'} callback={() => removeTodolist(todolist.id)}/>
                </div>
                <div>
                    <AddItemForm name={'Add Task'} addItem={addTask}/>
                </div>
                <ul>
                    {tasksJSX}
                </ul>
                <div>
                    <Button color={todolist.filter === 'All' ? s.activeFilter : ''} name={'All'}
                            callback={() => tsarChangeFilter('All')}/>
                    <Button color={todolist.filter === 'Active' ? s.activeFilter : ''} name={'Active'}
                            callback={() => tsarChangeFilter('Active')}/>
                    <Button color={todolist.filter === 'Completed' ? s.activeFilter : ''} name={'Completed'}
                            callback={() => tsarChangeFilter('Completed')}/>
                </div>
            </div>
        </div>
    )
}

