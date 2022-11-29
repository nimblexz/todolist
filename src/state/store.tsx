import React from "react";
import {combineReducers, createStore} from "redux";
import {tasksReducer} from "./tasks-reducer";
import {todolistsReducer} from "./todolists-reducer";
import {TasksStateType, TodolistType} from "../AppWithRedux";

export const rootReducer=combineReducers({
    todolists:todolistsReducer,
    tasks:tasksReducer
})

export const store=createStore(rootReducer)


export type AppRootState=ReturnType<typeof rootReducer>


// @ts-ignore
window.store=store