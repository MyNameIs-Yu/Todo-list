import Todo from "./components/Todo"
import { TasksProvider } from "./context/TasksContext"
// import Authorization from "./components/Auth/Authorization"

const App = () => {
  return (
    <div>
      <TasksProvider>
        {<Todo />}
      </TasksProvider>
      {/* <Authorization/> */}
    </div>
  )
}

export default App