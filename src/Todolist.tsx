import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, ListItem, Typography} from "@mui/material";
import {Delete} from "@mui/icons-material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootState} from "./state/store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {TasksStateType} from "./AppWithRedux";


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

export function Todolist(props: PropsType) {
    const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[props.id])
    const dispatch = useDispatch()


    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }

    let tasksForTodolists = tasks
    if (props.filter === "active") {
        tasksForTodolists=tasksForTodolists.filter(t => !t.isDone)
    }
    if (props.filter === "completed") {
        tasksForTodolists=tasksForTodolists.filter(t => t.isDone)
    }
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }


    return <div>
        <Typography fontWeight={"bolder"} fontStyle={"normal"} fontSize={"larger"} color={"secondary"} align={"center"}><EditableSpan
            title={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} aria-label={'delete'} size={"small"}><Delete
                fontSize={"inherit"}/></IconButton>
        </Typography>
        <AddItemForm addItem={(title) => {
            dispatch(addTaskAC(title, props.id))
        }}/>
        <ul>
            {
                tasksForTodolists.map(t => {
                    const onRemoveHandler = () => {
                        dispatch(removeTaskAC(t.id, props.id))
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {

                        dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.id))
                    }
                    const onChangeTitleHandler = (newValue: string) => {

                        dispatch(changeTaskTitleAC(t.id, newValue, props.id))
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
            <Button size={"small"} variant={props.filter === 'all' ? 'contained' : 'outlined'} color={"primary"}
                    onClick={onAllClickHandler}>All</Button>
            <Button size={"small"} variant={props.filter === 'active' ? 'contained' : 'outlined'} color={"secondary"}
                    className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>Active
            </Button>
            <Button size={"small"} variant={props.filter === 'completed' ? 'contained' : 'outlined'} color={"success"}
                    className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}
