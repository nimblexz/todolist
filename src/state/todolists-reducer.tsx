import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export type ADDTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
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
export const todolistsReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const todolist: TodolistType = {
                id: v1(),
                filter: "all",
                title: action.title
            }
            return [todolist, ...state]
        case 'CHANGE-TITLE-TODOLIST':
            const todolists = state.find(tl => tl.id === action.id)
            if (todolists)
                todolists.title = action.title
            return [...state]
        case 'CHANGE-FILTER-TODOLIST':
            let changetodolist = state.find(tl => tl.id === action.id)
            if (changetodolist) changetodolist.filter = action.filter
            return [...state]


        default:
            throw new Error('I don`t understand')
    }
}
export const RemoveTodolistAC=(todolistID:string):RemoveTodolistActionType=>{
    return {type:'REMOVE-TODOLIST',id:todolistID}
}
export const ADDTodolistAC=(newTodolistTitle:string):ADDTodolistActionType=>{
    return {type:'ADD-TODOLIST',title:newTodolistTitle}
}
export const ChangeTodolistTitleAC=(todolistId2:string,newTodolistTitle:string):ChangeTodolistTitleActionType=>{
    return {type:"CHANGE-TITLE-TODOLIST",id:todolistId2,title:newTodolistTitle}
}
export const ChangeTodolistFilterAC=(todolistId2:string,newFilter:FilterValuesType):ChangeTodolistFilterActionType=>{
    return {type:"CHANGE-FILTER-TODOLIST",id:todolistId2,filter:newFilter}
}