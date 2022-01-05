import React from 'react'
import { useForm } from 'react-hook-form'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { categoryState, toDoState } from './atoms';


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
        <form onSubmit={handleSubmit(handleValid)}> 
        {/* handleSubmit은 useForm에서 가져온 것이다 이 데이터가 유효할 때 onsubmit을 실행함 */}
            <input {...register("toDo", { required : "please write a To Do"})}/>
            <button>Add</button>
        </form>
    )
}

export default CreateToDo
