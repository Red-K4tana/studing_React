import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";



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
                <Todolist title={'Хомяки - ' + 5}/>
                <Todolist title={'Крысы - ' + 2}/>
                <Todolist title={'Мыши - ' + 32}/>
                <Todolist title={'Ласки - ' + 11}/>
            </div>
        </div>

    );
}

export default App;
