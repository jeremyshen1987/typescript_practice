'use client'

import {useState} from 'react'
import { toDOItem } from "../interfaces/toDoItem"
import { toDos_default } from "../data/toDo_initial"


export default function Page() {

    let nextId = 2

    const [name, setName] = useState('')
    const [toDos, setToDos] = useState<toDOItem []>(toDos_default)
    const [isEdit, setIsEdit] = useState<null | number>(null)

    function add_todo(name: string, toDos: {id: number, name: string, done: boolean}[], setToDos: (val: {id: number, name: string, done: boolean}[]) => void): void{

        nextId++
        
        setToDos([
            ...toDos,
            {
                id: nextId,
                name,
                done: false
            }
        ])
    }


    return (
    <>
        <label htmlFor="add_item">Add toDO: </label>
        <input onChange={(e) => setName(e.target.value)} type="text" id="add_item"></input>
        <button onClick={() => add_todo(name, toDos, setToDos)}>Submit</button>

        <ToDoContent  toDos={toDos} setToDos={setToDos} isEdit={isEdit} setIsEdit={setIsEdit}/>

    </>
    )
}


interface toDoContent_prop {
    toDos: toDOItem [],
    setToDos: (val: toDOItem []) => void,
    isEdit: number | null,
    setIsEdit: (val: number | null) => void
}

function ToDoContent({toDos, setToDos, isEdit, setIsEdit}: toDoContent_prop) {

    function saveToDo(e: React.ChangeEvent<HTMLInputElement>, t: toDOItem){

        let task: toDOItem;

        if(e.target.name === 'checkbox'){
            task = {
                ...t,
                done: e.target.checked
            }
        }else{

            task = {
                ...t,
                name: e.target.value
            }

        }

        setToDos(
            toDos.map(todo => {
                if(todo.id === task.id){
                    return task
                }else{
                    return todo
                }
            })
        )

    }

    function delete_toDo(item: toDOItem, setToDos: (val: toDOItem []) => void){
    
        const Arr = toDos.filter(t => t.id !== item.id)
        setToDos(Arr)
    }


    return(

        <>
   
            {toDos.map(t => {
                
                return(
                    <div id={t.id.toString()}>
                        <input  onChange={(e) => saveToDo(e, t)} checked={t.done} defaultChecked={t.done} type='checkbox' name='checkbox'/>
                        {t.id === isEdit ? <input onChange={(e) => saveToDo(e, t)} value={t.name} name='task_name' /> : <span>{t.name}</span>}
                        {t.id === isEdit ? <button onClick={() => setIsEdit(null)}>Save</button> : <button onClick={() => setIsEdit(t.id)}>Edit</button>}
                        <button onClick={() => delete_toDo(t, setToDos)}>Delete</button>
                    </div>
                )

                
    
            })}

        </>

    )

}

