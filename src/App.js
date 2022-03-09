import React, { useState, useRef, useEffect } from 'react'
import { stringify } from 'uuid'
import TodoList from './TodoList'
import { v4 as uuidv4 } from 'uuid'

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
    const [todos, setTodos] = useState([])
    const todoNameRef = useRef()

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos(storedTodos)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }

    function handleAddTodo(event) {
        const name = todoNameRef.current.value
        if (name === '') {
            return
        }
        setTodos(prevTodos => {
            return [...prevTodos, { id: uuidv4(), name: name, complete: false }]
        })
        console.log(name)
        todoNameRef.current.value = null // Clear field after hitting button
    }

    function handleClearTodos() {
        const newTodos = todos.filter(todo => !todo.complete)
        setTodos(newTodos)
    }

    return (
        <>
            <TodoList todos={todos} toggleTodo={toggleTodo} />
            <input ref={todoNameRef} type="text" />
            <button onClick={handleAddTodo}>Add new task</button>
            <button onClick={handleClearTodos}>Clear completed tasks</button>
            <div>{todos.filter(todo => !todo.complete).length} tasks remaining</div>
            <div></div>
        </>
    )
}

export default App;
