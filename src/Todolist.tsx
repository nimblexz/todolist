import React, {ChangeEvent, FC} from 'react';
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, ListItem, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {FilterValuesType, TasksStateType, TodolistType} from "./AppWithRedux";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "./state/todolists-reducer";

export type TodolistWithReduxPropsType = {
    todolist: TodolistType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export const Todolist: FC<TodolistWithReduxPropsType> = ({todolist}) => {
    const {id, title, filter} = todolist
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[id])
    const dispatch = useDispatch()




    const onAllClickHandler = () => {
        dispatch(changeTodolistFilterAC(todolist.id, "all"))
    }
    const onActiveClickHandler = () => {
        dispatch(changeTodolistFilterAC(todolist.id, "active"))
    }
    const onCompletedClickHandler = () => {
        dispatch(changeTodolistFilterAC(todolist.id, "completed"))
    }

    let tasksForTodolists = tasks
    if (filter === "active") {
        tasksForTodolists = tasksForTodolists.filter(t => !t.isDone)
    }
    if (filter === "completed") {
        tasksForTodolists = tasksForTodolists.filter(t => t.isDone)
    }




    return <div>
        <Typography fontWeight={"bolder"} fontStyle={"normal"} fontSize={"larger"} color={"secondary"} align={"center"}><EditableSpan
            title={title} onChange={(newTitle)=>{dispatch(changeTodolistTitleAC(todolist.id,newTitle))}}/>
            <IconButton onClick={()=>{dispatch(removeTodolistAC(todolist.id))}} aria-label={'delete'} size={"small"}><Delete
                fontSize={"inherit"}/></IconButton>
        </Typography>
        <AddItemForm addItem={(title) => {
            dispatch(addTaskAC(title,id))
        }}/>
        <ul>
            {
                tasksForTodolists.map(t => {
                    const onRemoveHandler = () => {
                        dispatch(removeTaskAC(t.id,id))
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {

                        dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, id))
                    }
                    const onChangeTitleHandler = (newValue: string) => {

                        dispatch(changeTaskTitleAC(t.id, newValue, id))
                    }
                    return <ListItem style={{padding: '0px ', margin: '-20px -20px -20px -30px'}} key={t.id}
                                     className={t.isDone ? 'is-done' : ''}>

                        <Checkbox checked={t.isDone}
                                  onChange={onChangeStatusHandler}
                                  defaultChecked color={"success"}
                        />
                        <EditableSpan title={t.title}
                                      onChange={onChangeTitleHandler}/>
                        <IconButton onClick={onRemoveHandler} aria-label={'delete'} size={"small"}><Delete
                            fontSize={"inherit"}/></IconButton>
                    </ListItem>
                })
            }

        </ul>
        <div>
            <Button size={"small"} variant={filter === 'all' ? 'contained' : 'outlined'} color={"primary"}
                    onClick={onAllClickHandler}>All</Button>
            <Button size={"small"} variant={filter === 'active' ? 'contained' : 'outlined'} color={"secondary"}
                    className={filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
            </Button>
            <Button size={"small"} variant={filter === 'completed' ? 'contained' : 'outlined'} color={"success"}
                    className={filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}
