import React, {ChangeEvent, useState} from 'react';
import {TextField, ThemeProvider} from '@material-ui/core';
import {theme} from "../../utils/theme/theme";

type EditableSpanPropsType = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
    console.log("EditableSpan called");
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(props.value);

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ?    <ThemeProvider theme={theme}><TextField color={"primary"} value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} /></ThemeProvider>
        : <span onDoubleClick={activateEditMode}>{props.value}</span>
});
