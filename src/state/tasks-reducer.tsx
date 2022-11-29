
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {ADDTodolistActionType, RemoveTodolistActionType, todolistId1, todolistId2} from "./todolists-reducer";
import {TasksStateType} from "../AppWithRedux";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todolistID: string
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    taskTitle: string
    todolistID: string

}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskTitle: string
    taskStatus: boolean
    todolistID: string

}
export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    taskTitle: string
    todolistID: string

}

export type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusActionType
    | ChangeTaskTitleActionType
    | ADDTodolistActionType
    | RemoveTodolistActionType
//[key: string]:
const initialState:TasksStateType={


}
export const tasksReducer = (state: TasksStateType=initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {...state, [action.todolistID]: state[action.todolistID].filter(t => t.id !== action.taskID)}
        }
        case "ADD-TASK": {
            let newtask: TaskType = {id: v1(), title: action.taskTitle, isDone: false}
            return {...state, [action.todolistID]: [newtask, ...state[action.todolistID]]}
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskTitle ? {
                    ...t,
                    isDone: action.taskStatus
                } : t)
            }
        }
        case "CHANGE-TASK-TITLE": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].map(t => t.id === action.taskID ? {
                    ...t,
                    title: action.taskTitle
                } : t)
            }
        }
        case "ADD-TODOLIST": {

            return {...state, [action.id]: []}
        }
        case "REMOVE-TODOLIST":{
            let statecopy={...state}
            delete statecopy[action.id]
            return statecopy
        }

        default:
            return state
    }
}
export const removeTaskAC = (taskID: string, todolistID: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', todolistID, taskID}

}
export const addTaskAC = (taskTitle: string, todolistID: string): AddTaskActionType => {
    return {type: 'ADD-TASK', taskTitle: taskTitle, todolistID: todolistID}
}
export const changeTaskStatusAC = (taskTitle: string, taskStatus: boolean, todolistID: string): ChangeTaskStatusActionType => {
    return {type: 'CHANGE-TASK-STATUS', taskTitle, taskStatus, todolistID}
}
export const changeTaskTitleAC = (taskID: string, taskTitle: string, todolistID: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', taskID, taskTitle, todolistID}
}



