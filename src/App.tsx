import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
// data:
    let todolistId1 = v1() // skd-34-ff
    let todolistId2 = v1()
// data:
    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todolistId1, title: ' What to learn', filter: 'active'}, // отдельный туду 1
        {id: todolistId2, title: ' What to buy', filter: 'all'}, // отдельный туду 2
    ])
// data:
    let [tasks, setTasks] = useState({
        [todolistId1]: [
            {id: v1(), title: 'HTML&&CSS', isDone: true}, // one task  isDone: true
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: true},
            {id: v1(), title: 'Redux', isDone: true},
            {id: v1(), title: 'GraphQl', isDone: true},
        ],
        [todolistId2]: [
            {id: v1(), title: 'Book', isDone: false},
            {id: v1(), title: 'Milk', isDone: false},
        ],
    })

    function removeTask(todolistId: string, id: string) {

        // let filteredTasks = tasks.filter(t => t.id != id);
        setTasks({...tasks, [todolistId]: [...tasks[todolistId].filter(todo => todo.id !== id)]})
    }

    function addTask(todolistId: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    function changeStatus(todolistId: string, taskId: string, isDone: boolean) {
        setTasks({
            ...tasks,
            [todolistId]: [...tasks[todolistId].map(todo => todo.id === taskId ? {...todo, isDone: isDone} : todo)]
        })
    }

    function changeFilter(todolistId: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(todo => todo.id === todolistId ? {...todo, filter: value} : todo))
    }


    return (
        <div className="App">
            {todoLists.map((todo) => {

                let tasksForTodolist = tasks[todo.id];
                if (todo.filter === 'active') {
                    tasksForTodolist = tasks[todo.id].filter(t => t.isDone === false);
                }
                if (todo.filter === 'completed') {
                    tasksForTodolist = tasks[todo.id].filter(t => t.isDone === true);
                }

                return (<Todolist key={todo.id}
                                  todolistId={todo.id} // id todolist
                                  title={todo.title}
                                  tasks={tasksForTodolist}
                                  removeTask={removeTask}
                                  changeFilter={changeFilter}
                                  addTask={addTask}
                                  changeTaskStatus={changeStatus}
                                  filter={todo.filter}
                    />

                )
            })}


        </div>
    );
}

export default App;
