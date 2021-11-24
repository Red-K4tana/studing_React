import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";

export type filterValuesType = 'All' | 'Active' | 'Completed' | 'X'

function App() {
    const [tasks, setTasks] = useState([ //hooke для удаления
            {id: v1(), title: "HTML", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "React", isDone: false},
            {id: v1(), title: "View", isDone: false},
            {id: v1(), title: "Angular", isDone: true},
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
            <div>
                <h3>What to learn Это Апп</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    <li><input type="checkbox" checked={true}/> <span>HTML&CSS</span></li>
                    <li><input type="checkbox" checked={true}/> <span>JS</span></li>
                    <li><input type="checkbox" checked={false}/> <span>React</span></li>
                </ul>

                <div>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                </div>
            </div>
            <Todolist
                title={'What to learn 11 этоToDoList'}
                tasks={array}
                removeTaskItem={removeTaskItem}
                setFilter={setFilter}
                addTask={addTask}
            />

        </div>
    );
}

export default App;

