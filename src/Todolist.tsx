import React from "react";

type TodolistPropsType = {
    title: string,
    tasks: Array<TasksType>
}

type TasksType = {
    id: number,
    title: string,
    isDone: boolean
}

export const Todolist = (props: TodolistPropsType)=> {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text" placeholder="write your text"/>
                <button>+</button>
            </div>
            <ul>
                <li><input type="checkbox" checked={props.tasks[0].isDone}/> <span>{props.tasks[0].id}</span></li>
                <li><input type="checkbox" checked={props.tasks[1].isDone}/> <span>{props.tasks[1].id}</span></li>
                <li><input type="checkbox" checked={props.tasks[2].isDone}/> <span>{props.tasks[2].title}</span></li>
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    )
}