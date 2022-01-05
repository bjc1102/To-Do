import { atom, selector } from "recoil"
import ToDo from "./ToDo";

export enum categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE"
}

export interface ITodo {
    text:string;
    id:number,
    category: categories
}

export const categoryState = atom<categories>({
    key:"category",
    default:categories.TO_DO,
})

export const toDoState = atom<ITodo[]>({
    key:"todo",
    default:[],
})

export const toDoSelector = selector({
    key:"toDoSelector",
    get: ({get}) => {
        const toDos = get(toDoState)
        const category = get(categoryState)
        return toDos.filter((todo) => todo.category === category)
    }
})