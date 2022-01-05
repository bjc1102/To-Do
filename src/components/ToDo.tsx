import React from 'react'
import { useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import { categories, ITodo, toDoState } from './atoms'

function ToDo({text, id, category}:ITodo) {

    // front == array  |  ...front는 front안에 있는걸 풀어서 넣는다.
    // front라고 쓰면 배열이 들어간다

    const setToDos = useSetRecoilState(toDoState)
    const onClick = (event:React.MouseEvent<HTMLButtonElement>) => {
        //string으로 한다면 잘 못된 값이 들어왔을 때 대처하기 어렵다.
        //그렇다고 길게 쓰고 싶지 않을 때 쓰는 typescript 팁
        const {currentTarget : { name }} = event;
        //그래서 현재값을 받아오는 매개변수를 선언하고 만든다..
        setToDos(oldToDos => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id)
            //findIndex는 배열을 map처럼 펼쳐주고 그 하나하나 원소.id가 현재 넘어오는 <li>가 될 id와 비교해서 같은것을 targetindex에 넣어준다
            const oldToDo = oldToDos[targetIndex];
            const newToDo = {text, id, category:name as categories}
            return [...oldToDos.slice(0,targetIndex), newToDo, ...oldToDos.slice(targetIndex+1) ];
        })
    }

    const DeleteClick = (id:ITodo["id"]) => {
        setToDos((oldToDos) => {
            const targetIndex = oldToDos.findIndex(toDo => toDo.id === id) //toDoState를 받아와서 id를 비교해봄
            console.log(targetIndex)
            return [...oldToDos.slice(0,targetIndex), ...oldToDos.slice(targetIndex+1)]
        })
    }

    return (
        <List>
            <Content>{text}</Content>
            <ButtonList>
                {category !== categories.DOING && <button name={categories.DOING} onClick={onClick}>Doing</button>}
                {category !== categories.TO_DO &&<button name={categories.TO_DO}onClick={onClick}>To Do</button>}
                {category !== categories.DONE &&<button name={categories.DONE} onClick={onClick}>Done</button>}
                <button onClick={() => DeleteClick(id)}>-</button>
            </ButtonList>
        </List>
    )
}

export default ToDo


const Content = styled.span`
    color: ${props=>props.theme.textColor};
    display: block;
`

const List = styled.li`
    min-width: 400px;
    height: 30px;
    padding: 5px;
    margin: 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    list-style-type:none;
    border: 1px solid ${props => props.theme.textColor};
    border-radius: 10px;
    &:hover {
        span {
            color: ${props => props.theme.accentColor};
        }
        border: 1px solid ${props => props.theme.accentColor};
    }
`

const ButtonList = styled.div`
    button {
        border: 1px solid ${props=>props.theme.textColor};
        background-color: ${props => props.theme.bgColor};
        color: ${props => props.theme.textColor};
        border-radius: 3px;
        margin: 1px;
        &:hover{
            border: 1px solid ${props=>props.theme.accentColor};
            color: ${props=>props.theme.accentColor};
        }
    }
`