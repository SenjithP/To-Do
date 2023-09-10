import React,{useState} from 'react'

export const TodoForm = ({addTodo}) => {
    const [value, setValue]= useState("")

    const handleSubmit = e =>{
        e.preventDefault();
        addTodo(value)
        setValue("")
    }

  return (
    <form className='TodoForm' onSubmit={handleSubmit}>
        <input required type='text' className='todo-input' value={value} placeholder='Write Your Tasks Here' onChange={(e)=>setValue(e.target.value)}/>
        <button type='submit' className='todo-btn'>Add Task</button>
    </form>
  )
}
