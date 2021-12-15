import React, {useState} from 'react';
import './App.css';
import {TodoList} from "./TodoList";
import {v1} from "uuid";
import {Button} from "./components/Button";

export type FilterValuesType = 'All' | 'Active' | 'Completed' | 'X'
export type TasksType = {
    id: string,
    title: string,
    isDone: boolean,
}
type TodoListsType = {
    id: string,
    title: string,
    filter: FilterValuesType,
}
type TaskStateType = {
    [key: string]: Array<TasksType>
}

function App() {
    const TL_ID_1 = v1()
    const TL_ID_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListsType>>(
        [
            {id: TL_ID_1, title: 'What to learn', filter: 'All'},
            {id: TL_ID_2, title: 'What to buy', filter: 'All'}
        ]
    )
    const [tasks, setTasks] = useState<TaskStateType>({
            [TL_ID_1]: [
                {id: v1(), title: "HTML", isDone: false},
                {id: v1(), title: "JS", isDone: true},
                {id: v1(), title: "React", isDone: false},
            ],
            [TL_ID_2]: [
                {id: v1(), title: "MEAT", isDone: true},
                {id: v1(), title: "MILK", isDone: false},
                {id: v1(), title: "BEER", isDone: true},
            ]
        }
    )
    const removeTaskItem = (todoList_ID: string, itemID: string) => {
        let copyTasks = {...tasks}
        copyTasks[todoList_ID] = copyTasks[todoList_ID].filter(t => t.id !== itemID)
        setTasks(copyTasks)
    }
    const addTask = (todoList_ID: string, title: string) => {
        let copyTasks = {...tasks}
        let newTask: TasksType = {id: v1(), title: title, isDone: false}
        copyTasks[todoList_ID] = [...tasks[todoList_ID], newTask]
        setTasks(copyTasks)
    }
    const changeStatus = (todoList_ID: string, itemID: string, value: boolean) => {
        let copyTasks = {...tasks}
        copyTasks[todoList_ID] = tasks[todoList_ID].map(t => t.id === itemID ? {...t, isDone: value} : t)
        setTasks(copyTasks)
    }

    const changeFilter = (todoList_ID: string, value: FilterValuesType) => {
        let copyTodoLists = [...todoLists]
        copyTodoLists = copyTodoLists.map(tl => tl.id === todoList_ID ? {...tl, filter: value} : tl)
        setTodoLists(copyTodoLists)
    }
    const removeTodoList = (todoList_ID: string)=> {
        setTodoLists(todoLists.filter(tl => tl.id !== todoList_ID))
    }
    const addTodoList = () => {
        const newTodoList_ID: string = v1()
        const newTodoList: TodoListsType = {id: newTodoList_ID, title: 'New TL', filter:'All'}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newTodoList_ID]: []})
    }
//---------------------------------------------------------------------------------------------------
    const todoListComp = todoLists.map(tl => {
            let tasksForRender = tasks[tl.id]
            if (tl.filter === 'Active') {
                tasksForRender = tasks[tl.id].filter(t => !t.isDone)
            }
            if (tl.filter === "Completed") {
                tasksForRender = tasks[tl.id].filter(t => t.isDone)
            }
            return (
                <div className="todoList">
                    <TodoList
                        key={tl.id}
                        todoList_id={tl.id}
                        todoListTitle={tl.title}
                        tasks={tasksForRender}
                        removeTaskItem={removeTaskItem}
                        setFilter={changeFilter}
                        addTask={addTask}
                        changeStatus={changeStatus}
                        filter={tl.filter}
                        removeTodoList={removeTodoList}
                    />
                </div>
            );
        }
    )
    //---------------------------------------------------------------------------------------------------
    return (
        <div>
            <div className={'todoLists'}>
                {todoListComp}
                <div className={'button-add-tl'}>
                    <Button name={'AddTL'} callback={addTodoList}/>
                </div>
            </div>
        </div>
    )
}

export default App;

