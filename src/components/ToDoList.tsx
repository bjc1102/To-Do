import React from 'react';
import { useForm } from 'react-hook-form';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';
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
        <Container>
            <Title>To Dos</Title>
            <Line/>
            <select value={category} onInput={onInput}>
                <option value={categories.TO_DO}>To Do</option>
                <option value={categories.DOING}>Doing</option>
                <option value={categories.DONE}>Done</option>
            </select>
            <CreateToDo/>
            {toDos?.map((todo) => <ToDo key={todo.id} {...todo}/>)}
        </Container>
    )
}

export default ToDoList

const Container = styled.div`
    min-width: 480px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 10px;

`
const Line = styled.span`
    min-width: 480px;
    background-color: white;
    height: 2px;
    margin: 10px 0px;
`
const Title = styled.h1`
    font-size: 32px;
    color:${props=>props.theme.accentColor};
    font-family: 'Times New Roman', Times, serif;
`