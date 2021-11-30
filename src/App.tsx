import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterValuesType = 'All' | 'Active' | 'Completed' | 'X'

function App() {
    const [tasks, setTasks] = useState([ //hooke для удаления
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "JS", isDone: false},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "View", isDone: true},
            {id: v1(), title: "Angular", isDone: false},
            {id: v1(), title: "CSS", isDone: true},
            {id: v1(), title: "C#", isDone: false},
        ]
    )
    const removeTaskItem = (itemId: string) => {
        setTasks(tasks.filter(x => x.id !== itemId))
    }
    const addTask = (title: string) => {
        let newTask = [...tasks, {id: v1(), title: title, isDone: false}]
        setTasks(newTask)
        console.log(tasks)
    }
    const changeStatus = (value: boolean, itemId: string)=> {
        setTasks(tasks.map(m=> m.id === itemId ? {...m, isDone: value} : m))

    }


    //---------------------------------------------------------
    const [filter, setMyFilter] = useState<filterValuesType>('All') //hooke для фильтра

    let array = tasks

    const setFilter = (value: filterValuesType) => {
        setMyFilter(value)
    }
    if (filter === 'All') {
        array = tasks
    }
    if (filter === 'Completed') {
        array = tasks.filter(x => x.isDone)
    }
    if (filter === 'Active') {
        array = tasks.filter(x => !x.isDone)
    }
    //---------------------------------------------------------
    return (
        <div className="App">
            <Todolist
                title={'What to learn 11 этоToDoList'}
                tasks={array}
                removeTaskItem={removeTaskItem}
                setFilter={setFilter}
                addTask={addTask}
                changeStatus={changeStatus}
                filter={filter}
            />

        </div>
    );
}

export default App;

