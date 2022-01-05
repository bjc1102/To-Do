import React from 'react';
import { useForm } from 'react-hook-form';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { ITodo, toDoSelector, toDoState, categoryState, categories } from './atoms';
import CreateToDo from './CreateToDo';
import ToDo from './ToDo';


function ToDoList() {

    const toDos = useRecoilValue(toDoSelector)
    const [category, setCategoryState] = useRecoilState(categoryState)

    const onInput = (event:React.FormEvent<HTMLSelectElement>) => {
        setCategoryState(event.currentTarget.value as categories)
    }


    return(
        <div>
            <h1>To Dos</h1>
            <hr/>
            <select value={category} onInput={onInput}>
                <option value={categories.TO_DO}>To Do</option>
                <option value={categories.DOING}>Doing</option>
                <option value={categories.DONE}>Done</option>
            </select>
            <CreateToDo/>
            {toDos?.map((todo) => <ToDo key={todo.id} {...todo}/>)}
        </div>
    )
}

export default ToDoList
