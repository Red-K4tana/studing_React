import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type filterType = 'All' | 'Active' | 'Completed'

function App() {
    const [task, setTask] = useState([
            {id: 1, title: "HTML", isDone: true},
            {id: 2, title: "JS", isDone: true},
            {id: 4, title: "React", isDone: false},
            {id: 5, title: "View", isDone: false},
            {id: 6, title: "Angular", isDone: true},
            {id: 7, title: "CSS", isDone: true},
            {id: 8, title: "C#", isDone: false},
            {id: 9, title: "C++", isDone: false},
            {id: 10, title: "PHP", isDone: true},
            {id: 11, title: "Java", isDone: false},
            {id: 12, title: "Kotlin", isDone: true}
        ]
    )
    const removeTaskItem = (itemId: number) => {
        setTask(task.filter(x => x.id !== itemId))
    }
    //---------------------------------------------------------
    const [filter, setMyFilter] = useState<filterType>('All')

    let array = task

    const setFilter = (value: filterType) => {
        setMyFilter(value)
    }
    if (filter === 'All') {
        array = task
    } else if (filter === 'Completed') {
        array = task.filter(x => x.isDone)
    } else if (filter === 'Active') {
        array = task.filter(x => !x.isDone)
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
            />

        </div>
    );
}

export default App;

