import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string

}
export type ADDTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
    id: string
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TITLE-TODOLIST'
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-FILTER-TODOLIST'
    id: string
    filter: FilterValuesType
}
export type ActionType =
    RemoveTodolistActionType
    | ADDTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
export let todolistId1 = v1()
export let todolistId2 = v1()
const initialState:Array<TodolistType> = [

    ]

export const todolistsReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const todolist: TodolistType = {
                id: action.id,
                filter: "all",
                title: action.title
            }
            return [todolist, ...state]
        case 'CHANGE-TITLE-TODOLIST':

            return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case 'CHANGE-FILTER-TODOLIST':

            return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)


        default:
            return state
    }
}
export const removeTodolistAC = (todolistID: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistID}
}
export const addTodolistAC = (newTodolistTitle: string): ADDTodolistActionType => {
    return {type: 'ADD-TODOLIST', title: newTodolistTitle, id: v1()}
}
export const changeTodolistTitleAC = (todolistId2: string, newTodolistTitle: string): ChangeTodolistTitleActionType => {
    return {type: "CHANGE-TITLE-TODOLIST", id: todolistId2, title: newTodolistTitle}
}
export const changeTodolistFilterAC = (todolistId2: string, newFilter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: "CHANGE-FILTER-TODOLIST", id: todolistId2, filter: newFilter}
}