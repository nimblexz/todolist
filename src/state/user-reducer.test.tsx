import React from "react";
import {userReducer} from "./user-reducer";

test('user reducer should increment only age', () => {
    const startState = {age: 23, childrenCount: 0, name: 'Emil'}
    const endState = userReducer(startState, {type: 'INCREMENT-AGE'})
    expect(endState.age).toBe(24)
    expect(startState.age).toBe(23)
    expect(startState.childrenCount).toBe(0)
    expect(endState.childrenCount).toBe(0)
})
test('user reducer should increment only childrenCount', () => {
    const startState = {age: 23, childrenCount: 0, name: 'Emil'}
    const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})
    expect(endState.age).toBe(23)
    expect(startState.age).toBe(23)
    expect(startState.childrenCount).toBe(0)
    expect(endState.childrenCount).toBe(1)
})
test('user reducer should change name of User', () => {
    const startState = {age: 23, childrenCount: 0, name: 'Emil'}
    const newname = 'Emili'
    const endState = userReducer(startState, {type: 'CHANGE-NAME-USER', newname: newname})

    expect(startState.name).toBe('Emil')
    expect(endState.name).toBe(newname)
    expect(endState.name).toBe('Emili')
})