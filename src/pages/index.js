import React from 'react'
import { useState, useEffect } from 'react'
import Notes from '@/components/notes'
import axios from 'axios'

const Home = () => {
  const [form, setForm] = useState({ title: '', content: '' })
  const [notes, setNotes] = useState([])

  const setTitle = (title) => {
    setForm({ ...form, title })
  }

  const setContent = (content) => {
    setForm({ ...form, content })
  }

  const createNote = async () => {
    if (!form.title || !form.content) return

    try {
      const res = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      })

      const { data } = await res.json()
      setNotes([data, ...notes])
      setForm({ title: '', content: '' })
    } catch (error) {
      console.log(error)
    }

  }

  return (
    <>
      <div className='w-full flex justify-center p-5'>
        <div className='flex flex-col w-full md:w-1/2 items-center mt-12'>
          <div className='w-full'>
            <p className="text-2xl">
              Take Notes with Prisma and PostgresSQL
            </p>

            <form className='mt-8' onSubmit={e => {
              e.preventDefault()
              createNote(form)
            }}>
              <input type="text" className="w-full p-2 border dark:bg-[#363636] border-gray-500 rounded-md" placeholder="Title" value={form.title} onChange={e => setTitle(e.target.value)}></input>
              <textarea rows={8} className="w-full p-2 mt-2 border dark:bg-[#363636] border-gray-500 rounded-md" placeholder="Content" value={form.content} onChange={e => setContent(e.target.value)}></textarea>
              <button className="w-full p-2 mt-2 text-white bg-blue-500 rounded-md" type="submit">Create Note</button>
            </form>
          </div>
          <Notes />
        </div>
      </div>
    </>
  )
}

export default Home