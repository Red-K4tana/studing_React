import {TasksStateType, TodoListsType} from "../../App";
import {AddTodoListAC, RemoveTodoListAC, todoListReducer} from "./todoList-reducer";
import {tasksReducer} from "./task-reducer";
import {v1} from "uuid";

test('ids should be equals', ()=> {
    const startTasksState: TasksStateType = {}
    const startTodoListState: Array<TodoListsType> = []

    const action = AddTodoListAC('New Todolist')

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListState = todoListReducer(startTodoListState, action)

    expect(Object.keys(endTasksState)[0]).toBe(action.id)
    expect(endTodoListState[0].id).toBe(action.id)
})
test('property with todolistId should be deleted', () => {
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

    const action = RemoveTodoListAC('todoListID_1')
    const endState: TasksStateType = tasksReducer(startState, action)

    expect(Object.keys(endState).length).toBe(1)
    expect(Object.keys(endState)[0]).toBe('todoListID_2')
    expect(endState['todoListID_1']).toBeUndefined()
})