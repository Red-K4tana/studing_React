import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";


const task1=[
    { id: 1, title: "Hello world1111", isDone: true },
    { id: 2, title: "I am Happy1111", isDone: false },
    { id: 3, title: "Yo11111", isDone: true }
]
const task2=[
    { id: 1, title: "Hello world22222", isDone: true },
    { id: 2, title: "I am Happy2222", isDone: true },
    { id: 3, title: "Yo22222", isDone: true }
]

const task3=[
    { id: 1, title: "Hello world33333", isDone: true },
    { id: 2, title: "I am Happy33333", isDone: false },
    { id: 3, title: "Yo33333", isDone: false }
]

function App() {
    return (
        <div>
            <div>
                <div>Yq</div>
                <div>Yq</div>
                <div>Yq</div>
                <div>Yq</div>
            </div>
            <div className="App">
                <Todolist title={'Хомяки'} tasks={task1}/>
                <Todolist title={'Крысы'} tasks={task2}/>
                <Todolist title={'Мыши'} tasks={task3}/>
            </div>
        </div>

    );
}

export default App;
