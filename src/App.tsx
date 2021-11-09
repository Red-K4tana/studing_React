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
                <Todolist title={'Хомяки'}/>
                <Todolist title={'Крысы'}/>
                <Todolist title={'Мыши'}/>
                <Todolist title={'Ласки'}/>
            </div>
        </div>

    );
}

export default App;
