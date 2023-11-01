'use client'

import { SyntheticEvent, useEffect, useState } from 'react';
import { Record } from '@web5/api'
// @ts-ignore
import * as W5 from '../node_modules/@web5/api/dist/browser';

const { Web5 } = W5

type Todo = {
  record: Record
  data: {
    text: string
    completed: boolean
  }
  id: string
}

export default function Home() {
  const [web5, setWeb5] = useState<typeof Web5>()
  const [myDid, setMyDid] = useState('')
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const initWeb5 = async () => {
      try {
        const { web5, did } = await Web5.connect()
        setWeb5(web5)
        setMyDid(did)
      } catch (error) {
        console.error(error);
      }
    }
    initWeb5()
  }, [])

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await web5?.dwn.records.query({
          message: {
            filter: {
              schema: 'http://some-schema-registry.org/todo'
            },
            dateSort: 'createdDescending' as any
          },
        });
        if (!response) return setTodos([])

        const { records } = response
        if (!records) return setTodos([])

        let todos: Todo[] = []
        for (let record of records) {
          const data = await record.data.json()
          todos.push({ record, data, id: record.id })
        }

        todos = todos.sort((a, b) => Number(a.data.completed) - Number(b.data.completed))

        return setTodos(todos)
      } catch (error) {
        console.error(error);
        return setTodos([])
      }
    }
    getTodos()
  }, [web5])

  const [description, setDescription] = useState('')
  const addTodo = async (event: SyntheticEvent) => {
    event.preventDefault()
    try {
      if (!web5) throw 'Error init Web5'

      const { record } = await web5.dwn.records.create({
        data: {
          text: description,
          completed: false
        },
        message: {
          schema: 'http://some-schema-registry.org/todo',
          dataFormat: 'application/json'
        }
      });

      if (!record) throw 'Error creating record'

      const data = await record.data.json();
      const todo = { record, data, id: record.id };
      setTodos(prev => ([todo, ...prev]))
      setDescription('')
    } catch (error) {
      console.error(error);
    }
  }

  const deleteTodo = async ({ todo }: { todo: Todo }) => {
    try {
      if (!web5) throw 'Error init Web5'

      await web5.dwn.records.delete({
        message: {
          recordId: todo.record.id
        }
      });

      setTodos(prev => prev.filter(item => item.record.id !== todo.record.id))
    } catch (error) {
      console.error(error);
    }
  }

  const toggleTodoStatus = async ({ todo }: { todo: Todo }) => {
    try {
      if (!web5) throw 'Error init Web5'

      // Get record in DWN
      const { record } = await web5.dwn.records.read({
        message: {
          recordId: todo.record.id,
        }
      });

      // Update the record in DWN
      await record.update({
        data: {
          ...todo.data, completed: !todo.data.completed
        }
      });

      setTodos(prev => prev.map(item => {
        if (item.record.id === todo.record.id) {
          item.data.completed = !todo.data.completed
        }

        return item
      }))
    } catch (error) {
      console.error(error);
    }
  }

  if (!myDid) return (
    <main className="bg-slate-100 pt-10 px-3 min-h-screen m-auto">
      <div className='mb-8'>
        <a target='_blank' className='underline text-blue-500 font-bold' href="https://github.com/KhoiUna/web5-nextjs-todoapp">Source code</a>
      </div>

      <div className="w-fit m-auto">
        <form
          onSubmit={event => event.preventDefault()}
          className="w-[350px] h-[70px] bg-white drop-shadow-lg flex justify-around items-center p-3 my-3 rounded-lg text-slate-500">
          <input autoComplete='off' className='text-black outline-none border-2 border-slate-300 p-2 rounded-lg' type="text" placeholder='Type here' />

          <button type="submit" className='bg-slate-50 p-2 rounded-lg ml-3'>Add</button>
        </form>

        <p className='italic mt-8 text-center'>Loading...</p>
      </div>
    </main>
  )

  return (
    <main className="bg-slate-100 pt-10 px-3 min-h-screen m-auto">
      <div className='mb-8'>
        <a target='_blank' className='underline text-blue-500 font-bold' href="https://github.com/KhoiUna/web5-nextjs-todoapp">Source code</a>
      </div>

      <div className="w-fit m-auto">
        <form
          onSubmit={addTodo}
          className="w-[350px] h-[70px] bg-white drop-shadow-lg flex justify-around items-center p-3 my-3 rounded-lg text-slate-500">
          <input autoComplete='off' className='text-black outline-none border-2 border-slate-300 p-2 rounded-lg' type="text"
            placeholder='Type here'
            value={description}
            onChange={({ target }) => setDescription(target.value)}
          />

          <button
            type="submit"
            className='bg-slate-50 p-2 rounded-lg ml-3'
          >Add</button>
        </form>

        {todos.map((item, index) => (
          <TodoCard key={index} todo={item} deleteTodo={deleteTodo} toggleTodoStatus={toggleTodoStatus} />
        ))}
      </div>
    </main>
  )
}

function TodoCard({ todo, deleteTodo, toggleTodoStatus }: {
  todo: Todo
  toggleTodoStatus: ({ todo }: { todo: Todo }) => void
  deleteTodo: ({ todo }: { todo: Todo }) => void
}) {
  return (
    <div
      className={"w-[350px] h-[70px] bg-white drop-shadow-lg flex justify-around items-center p-3 my-3 rounded-lg "
        + `${todo.data.completed ? 'opacity-40' : ''}`
      }
    >
      <input type="checkbox" checked={todo.data.completed}
        onChange={() => toggleTodoStatus({ todo })}
      />

      <p
        className={"truncate mx-3 " + `${todo.data.completed ? 'line-through' : ''}`}
      >{todo.data.text}</p>

      <button type="button" className="text-red-500 bg-red-100 p-2 rounded-lg"
        onClick={() => deleteTodo({ todo })}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48h-36V36a28 28 0 0 0-28-28h-48a28 28 0 0 0-28 28v12H40a12 12 0 0 0 0 24h4v136a20 20 0 0 0 20 20h128a20 20 0 0 0 20-20V72h4a12 12 0 0 0 0-24ZM100 36a4 4 0 0 1 4-4h48a4 4 0 0 1 4 4v12h-56Zm88 168H68V72h120Zm-72-100v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0Zm48 0v64a12 12 0 0 1-24 0v-64a12 12 0 0 1 24 0Z" /></svg>
      </button>
    </div>
  )
}