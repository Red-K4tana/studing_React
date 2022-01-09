import {v1} from 'uuid'
import {TasksStateType} from "../../App";
import {addTaskItemAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskItemAC, tasksReducer} from "./task-reducer";
import {AddTodoListAC, todoListReducer} from "./todoList-reducer";

test('correct task should be removed', ()=> {
    const todoListID_1 = v1()
    const todoListID_2 = v1()

    const startState: TasksStateType = {
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "JS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "MILK", isDone: false},
            {id: v1(), title: "MEAT", isDone: false},
        ]
    }
    const endState = tasksReducer(startState, removeTaskItemAC(todoListID_2, startState[todoListID_2][0].id))
    /*const endState = tasksReducer(startState, {type: "REMOVE-TASK-ITEM", todoListID: todoListID_2, taskID: startState[todoListID_2][0].id})*/

    expect(endState[todoListID_2].length).toBe(1)
    expect(endState[todoListID_2][0].title).toBe('MEAT')
})
test('correct task should be added', ()=> {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const newTaskTitle = 'New Task'

    const startState: TasksStateType = {
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "JS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "MILK", isDone: false},
            {id: v1(), title: "MEAT", isDone: false},
        ]
    }
    const endState = tasksReducer(startState, addTaskItemAC(todoListID_2, newTaskTitle))

    expect(endState[todoListID_2].length).toBe(3)
    expect(endState[todoListID_2][2].title).toBe(newTaskTitle)
})
test('correct task should be change its title', ()=> {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const newTaskTitle = 'New Task'

    const startState: TasksStateType = {
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "JS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "MILK", isDone: false},
            {id: v1(), title: "MEAT", isDone: false},
        ]
    }
    const endState = tasksReducer(startState, changeTaskTitleAC(todoListID_2, startState[todoListID_2][0].id, newTaskTitle))

    expect(endState[todoListID_2][0].title).toBe(newTaskTitle)
    expect(endState[todoListID_2][1].title).toBe('MEAT')
})
test('correct task should be change its status', ()=> {
    const todoListID_1 = v1()
    const todoListID_2 = v1()
    const newIsDone = true

    const startState: TasksStateType = {
        [todoListID_1]: [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "JS", isDone: false},
        ],
        [todoListID_2]: [
            {id: v1(), title: "MILK", isDone: false},
            {id: v1(), title: "MEAT", isDone: false},
        ]
    }
    const endState = tasksReducer(startState, changeTaskStatusAC(todoListID_1, startState[todoListID_1][1].id, newIsDone))

    expect(endState[todoListID_1][1].isDone).toBe(true)
    expect(endState[todoListID_1][1].title).toBe('JS')
    expect(endState[todoListID_1][0].isDone).toBe(false)
    expect(endState[todoListID_2][0].isDone).toBe(false)
    expect(endState[todoListID_2][1].isDone).toBe(false)
})
test('new array should be added when new todolist is added', ()=> {
    const startState: TasksStateType = {
        'todoListID_1': [
            {id: v1(), title: "HTML", isDone: false},
            {id: v1(), title: "JS", isDone: false},
        ],
        'todoListID_2': [
            {id: v1(), title: "MILK", isDone: false},
            {id: v1(), title: "MEAT", isDone: false},
        ]
    }
    const action = AddTodoListAC('New Todolist')
    const endState: TasksStateType = tasksReducer(startState, action)

    const newKey = Object.keys(endState).find(k => k !== 'todoListID_1' && k !== 'todoListID_2')
    if (!newKey) throw new Error('The required key is missing!')

    expect(Object.keys(endState).length).toBe(3)
    expect(Object.keys(endState)[2]).toBe(action.id)
    expect(endState[newKey]).toEqual([])

})





















