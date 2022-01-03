import {TasksStateType} from "../../App";
import {v1} from "uuid";

type RemoveTaskItemActionType = {
    type: 'REMOVE-TASK-ITEM'
    todoListID: string
    taskID: string
}
type AddTaskItem = {
    type: 'ADD-TASK-ITEM'
    todoListID: string
    newTitle: string
}
type ChangeTaskTitle = {
    type: 'CHANGE-TASK-TITLE'
    todoListID: string
    taskID: string
    newTitle: string
}
type ChangeTaskStatus = {
    type: 'CHANGE-TASK-STATUS'
    todoListID: string
    taskID: string
    newIsDone: boolean
}
type ActionType = RemoveTaskItemActionType | AddTaskItem | ChangeTaskTitle | ChangeTaskStatus

export const removeTaskItemAC = (todoListID: string, taskID: string)=> {
    return {type: "REMOVE-TASK-ITEM" as const, todoListID: todoListID, taskID: taskID}
}
export const addTaskItemAC = (todoListID: string, newTitle: string)=> {
    return {type: "ADD-TASK-ITEM" as const, todoListID: todoListID, newTitle: newTitle}
}
export const changeTaskTitleAC = (todoListID: string, taskID: string, newTitle: string)=> {
    return {type: 'CHANGE-TASK-TITLE' as const, todoListID: todoListID, taskID: taskID, newTitle: newTitle}
}
export const changeTaskStatusAC = (todoListID: string, taskID: string, newIsDone: boolean)=> {
    return {type: 'CHANGE-TASK-STATUS' as const, todoListID: todoListID, taskID: taskID, newIsDone: newIsDone}
}

export const tasksReducer = (tasks: TasksStateType, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK-ITEM':
            return {...tasks, [action.todoListID]: tasks[action.todoListID].filter(t => t.id !== action.taskID)}
        case 'ADD-TASK-ITEM':
            const newTask = {
                id: v1(),
                title: action.newTitle,
                isDone: false
            }
            return {...tasks, [action.todoListID]: [...tasks[action.todoListID], newTask]}
        case 'CHANGE-TASK-TITLE':
            return {...tasks, [action.todoListID]: tasks[action.todoListID].map(t => t.id === action.taskID ? {...t, title: action.newTitle} : t)}
        case 'CHANGE-TASK-STATUS':
            return {...tasks, [action.todoListID]: tasks[action.todoListID].map(t => t.id === action.taskID ? {...t, isDone: action.newIsDone} : t)}
        default:
            throw new Error('Incorrect type!')
    }
}