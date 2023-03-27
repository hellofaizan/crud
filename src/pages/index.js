import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const Home = ({allNotes}) => {
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
      <div className='flex flex-col w-full items-center mt-12'>
        <p className="text-2xl">
          Take Notes with Prisma and PostgresSQL
        </p>

        <form className='mt-8' onSubmit={e => {
          e.preventDefault()
          createNote(form)
        }}>
          <input type="text" className="w-full p-2 border border-gray-300 rounded-md" placeholder="Title" value={form.title} onChange={e => setTitle(e.target.value)}></input>
          <textarea rows={8} className="w-full p-2 mt-2 border border-gray-300 rounded-md" placeholder="Content" value={form.content} onChange={e => setContent(e.target.value)}></textarea>
          <button className="w-full p-2 mt-2 text-white bg-blue-500 rounded-md" type="submit">Create Note</button>
        </form>
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/notes')
  const { data } = await res.json()

  return {
    props: {
      allNotes: data
    }
  }
}

export default Home