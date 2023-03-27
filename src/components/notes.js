import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'

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
                        <h2 className="text-xl font-bold">{note.title}</h2>
                        <p className="mt-2">{note.content}</p>

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
                            <button className="p-[6px] text-sm text-white bg-blue-500 rounded-md" onClick={
                                async () => {
                                    // Make a pop-up modal to edit the note using the same form
                                    // as the create note form
                                    
                                }
                            }><i className='bi bi-pen'></i></button>
                        </div>
                    </div>
                </>
            })}
        </>
    )
}

export default Notes