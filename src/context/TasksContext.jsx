import { useState, useEffect, useRef, useCallback, useMemo, createContext } from "react"

export const TasksContext = createContext( {} )

export const TasksProvider = (props) => {
  const { children } = props

  const [tasks, setTasks] = useState([])

  const [newTaskTitle, setNewTaskTitle] = useState('')

  const [searchQuery, setSearchQuery] = useState('')
  
  const newTaskInputRef = useRef(null)  

  const firstIncompleteTaskRef = useRef(null)

  const firstIncompleteTaskId = tasks.find( ( {isDone} ) => !isDone)?.id

  const deleteAllTasks = useCallback(async () => {
    const isConfirmed = confirm('Delete all?')

    if (!isConfirmed) {
      return
    }

    await fetch(
      'http://127.0.0.1:8000/api/tasks/clear/',
      {
        method: 'DELETE',
      }
    )

    setTasks([])
  }, [])

  const deleteTask = useCallback(async (taskId) => {
    await fetch(
      `http://127.0.0.1:8000/api/tasks/${taskId}/`,
      {
        method: 'DELETE',
      }
    )

    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskId)
    )
  }, [])

  const toggleTaskComplete = useCallback(
    async (taskId, isDone) => {
      const task = tasks.find(
        (task) => task.id === taskId
      )

      if (!task) {
        return
      }

      await fetch(
        `http://127.0.0.1:8000/api/tasks/${taskId}/`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: task.title,
            isDone,
          }),
        }
      )

      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === taskId
            ? { ...task, isDone }
            : task
        )
      )
    },
    [tasks]
  )

  const addTask = useCallback(async () => {
    if (newTaskTitle.trim().length === 0) {
      return
    }

    const response = await fetch(
      'http://127.0.0.1:8000/api/tasks/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTaskTitle,
        }),
      }
    )

    const task = await response.json()

    setTasks((prevTasks) => [...prevTasks, task])

    setNewTaskTitle('')
    setSearchQuery('')

    newTaskInputRef.current?.focus()
  }, [newTaskTitle])

  useEffect(() => {
  fetch('http://127.0.0.1:8000/api/tasks/')
    .then((response) => response.json())
    .then((data) => setTasks(data))
    .catch((error) => console.error(error))
  }, []) 

  useEffect( () => {
    newTaskInputRef.current.focus()
  }, [])

  const filteredTasks = useMemo( () => {
    const clearSearchQuery = searchQuery.trim().toLowerCase()
    
    return clearSearchQuery.length > 0
    ? tasks.filter( ({title}) => title.toLowerCase().includes(clearSearchQuery) )
    : null
  }, [searchQuery, tasks])

  return (
    <TasksContext.Provider
      value = {{
        tasks,
        filteredTasks,
        firstIncompleteTaskRef,
        firstIncompleteTaskId,
        deleteTask,
        deleteAllTasks,
        toggleTaskComplete,
        
        newTaskTitle,
        setNewTaskTitle,
        searchQuery,
        setSearchQuery,
        newTaskInputRef,
        addTask
      }}
    >
      { children }
    </TasksContext.Provider>
  )
}