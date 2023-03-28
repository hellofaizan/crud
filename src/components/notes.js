import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function Notes() {
    const [allNotes, setAllNotes] = useState([])

    useEffect(() => {
        axios.get('/api/notes').then(res => {
            setAllNotes(res.data.data)
        })
    }, [allNotes])

    return (
        <>
            {allNotes.map(note => {
                return <>
                    <div key={note.id} className="relative w-full p-4 mt-4 rounded-md shadow-md">
                        <h2 key={note.title} className="text-xl font-bold">{note.title}</h2>
                        <p key={note.content} className="mt-2">{note.content}</p>

                        <div className='flex space-x-1 absolute top-0 right-0 mr-3 mt-3'>
                            <button className="p-[6px] text-sm text-white bg-red-500 rounded-md" onClick={
                                async () => {
                                    try {
                                        const res = await fetch('/api/delete', {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type': 'application/json'
                                            },
                                            body: JSON.stringify({ id: note.id })
                                        })
                                        const { data } = await res.json()
                                        setAllNotes(allNotes.filter(note => note.id !== data.id))
                                    } catch (error) {
                                        console.log(error)
                                    }
                                }
                            }><i className='bi bi-trash'></i></button>
                            <Popup trigger={<button className="p-[6px] text-sm text-white bg-blue-500 rounded-md"><i className='bi bi-pen'></i></button>}
                                modal nested>
                                {close => (
                                    <div className='modal'>
                                        <button className="close cursor-pointer absolute right-2 top-0 text-3xl" onClick={close}>
                                            &times;
                                        </button>
                                        <div className="header w-full mb-5 border-b font-[18px] text-center p-4 font-mono ">Edit the Note</div>
                                        {/* Edit text and text area */}
                                        <div className="content">
                                            <form className="flex flex-col space-y-3 p-1" onSubmit={
                                                async (e) => {
                                                    e.preventDefault()
                                                    try {
                                                        const res = await fetch('/api/update', {
                                                            method: 'POST',
                                                            headers: {
                                                                'Content-Type': 'application/json'
                                                            },
                                                            body: JSON.stringify({ id: note.id, title: e.target.title.value, content: e.target.content.value })
                                                        })
                                                        const { data } = await res.json()
                                                        setAllNotes(allNotes.map(note => note.id === data.id ? data : note))
                                                        close()
                                                    } catch (error) {
                                                        console.log(error)
                                                    }
                                                }
                                            }>
                                                <input type="text" name="title" defaultValue={note.title} placeholder="New title for Note" className="p-2 border border-gray-300 rounded-md" />
                                                <textarea name="content" defaultValue={note.content} rows={8} placeholder="Update the note" className="p-2 border border-gray-300 rounded-md" />
                                                <button type="submit" className="p-2 text-white bg-blue-500 rounded-md">Edit</button>
                                            </form>

                                        </div>
                                    </div>
                                )}
                            </Popup>
                        </div>
                    </div>
                </>
            })}
        </>
    )
}

export default Notes