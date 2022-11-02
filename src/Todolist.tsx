import React, {ChangeEvent} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton, ListItem} from "@mui/material";
import {CheckBox, Delete} from "@mui/icons-material";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void
    filter: FilterValuesType
    id: string
    removeTodolist: (todolistId: string) => void
    changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const onAllClickHandler = () => {
        {
            props.changeFilter("all", props.id)
        }
    }
    const onActiveClickHandler = () => {
        {
            props.changeFilter("active", props.id)
        }
    }
    const onCompletedClickHandler = () => {
        {
            props.changeFilter("completed", props.id)
        }
    }

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    return <div>
        <h3><EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist} aria-label={'delete'} size={"small"}><Delete
                fontSize={"inherit"}/></IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onRemoveHandler = () => {
                        props.removeTask(t.id, props.id)
                    }
                    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {

                        props.changeTaskStatus(t.id, e.currentTarget.checked, props.id)
                    }
                    const onChangeTitleHandler = (newValue: string) => {

                        props.changeTaskTitle(t.id, newValue, props.id)
                    }
                    return <ListItem style={{padding:'0px ',margin:'-20px -20px 0px -30px'}} key={t.id} className={t.isDone ? 'is-done' : ''}>

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
