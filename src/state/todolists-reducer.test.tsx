import {v1} from "uuid";
import {FilterValuesType, TodolistType} from "../App";
import {
    ADDTodolistAC, ChangeTodolistFilterAC, ChangeTodolistTitleAC, RemoveTodolistAC, todolistsReducer
} from "./todolists-reducer";

test('correct todolist should be removed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()

    const startStatee: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    const endState = todolistsReducer(startStatee, RemoveTodolistAC(todolistId1))
    expect(startStatee.length).toBe(2)
    expect(startStatee[0].id).toBe(todolistId1)
    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)

})
test('correct todolist should be added', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newTodolistTitle = 'New Todolist'

    const startStatee: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]
    const endState = todolistsReducer(startStatee, ADDTodolistAC(newTodolistTitle))
    expect(startStatee.length).toBe(2)
    expect(startStatee[0].id).toBe(todolistId1)
    expect(endState.length).toBe(3)
    expect(endState[0].title).toBe(newTodolistTitle)
    expect(endState[0].title).toBe('New Todolist')
    expect(startStatee[0].title).toBe('What to learn')


})
test('correct todolist should change its name', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newTodolistTitle = 'New Todolist'

    const startStatee: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ]

    const endState = todolistsReducer(startStatee, ChangeTodolistTitleAC(todolistId2, newTodolistTitle))
    expect(startStatee.length).toBe(2)

    expect(endState[1].title).toBe(newTodolistTitle)
    expect(startStatee[1].title).toBe('What to buy')


})
test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1()
    let todolistId2 = v1()
    let newFilter: FilterValuesType = "completed"

    const startState: Array<TodolistType> = [
        {id: todolistId1, title: 'What to learn', filter: "all"},
        {id: todolistId2, title: 'What to buy', filter: "all"}
    ]
    const endState = todolistsReducer(startState, ChangeTodolistFilterAC(todolistId2, newFilter))


    expect(endState[1].filter).toBe(newFilter)
    expect(endState[0].filter).toBe("all")
    expect(startState[1].filter).toBe("all")


})