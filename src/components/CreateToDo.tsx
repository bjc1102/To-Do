import React from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { categoryState, toDoState } from './atoms';
import styled from "styled-components"

interface IForm {
    toDo:string;
}


function CreateToDo() {
    const setTodos = useSetRecoilState(toDoState);
    const category = useRecoilValue(categoryState)

    const {
        register,
        handleSubmit,
        setValue
    } = useForm<IForm>()

    const handleValid = ({toDo}:IForm) => {
        setTodos(oldToDos=> [{text:toDo, id: Date.now(), category}, ...oldToDos])
        setValue("toDo", "")
    }

    return (
        <Form onSubmit={handleSubmit(handleValid)}> 
        {/* handleSubmit은 useForm에서 가져온 것이다 이 데이터가 유효할 때 onsubmit을 실행함 */}
            <Input {...register("toDo", { required : "please write a To Do"})}/>
            <Button>+</Button>
        </Form>
    )
}

export default CreateToDo


const Form = styled.form`
    padding: 10px;

`

const Input = styled.input`
    width: 200px;
    height: 30px;
`


const Button = styled.button`
    width: 30px;
    height: 30px;
`