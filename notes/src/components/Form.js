import React, {useState, useEffect} from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {createNote, getNotes, updateNote, deleteNote} from '../utils/noteHelpers'

const STATUS_INITIAL_VALUE = ''

export default function F({selectedNote, setSelectedNote, refreshList}) {
  const [title, setTitle] = useState('')
  const [isSaved, setIsSaved] = useState(false)
  const [status, setStatus] = useState(STATUS_INITIAL_VALUE)

  useEffect(() => {
    setTimeout(() => setStatus(STATUS_INITIAL_VALUE), 5000)
  }, [status])

  useEffect(() => {
    if (selectedNote) return setTitle(selectedNote.title)
    setTitle('')
  }, [selectedNote])

  const [body, setBody] = useState('')
  const onSetTitle = (e) => setTitle(e.target.value)
  const onSetBody = (e) => setBody(e.target.value)

  const onSave = () => {
    setTitle('')
    setStatus('SAVED!')
    if (selectedNote) {
      updateNote(selectedNote.id, title)
      return refreshList()
    }

    createNote(title, '')
    refreshList()
  }

  // how to disable reload button click
  // const onSave = (e) => {
  //   e.preventDefault()
  // }

  const onDelete = () => {
    const {id} = selectedNote
    deleteNote(id)
    refreshList()
    setTitle('')
    setStatus('DELETED!')
  }

  return (
    <Form className="m-4">
      <Form.Label>Title</Form.Label>
      <Form.Control
        onChange={onSetTitle}
        // value={selectedNote ? selectedNote.title : title}
        value={title}
        className="mb-3"
        placeholder="Enter title"
        size="lg"
      />
      <Form.Label>Note</Form.Label>
      <Form.Control onChange={onSetBody} as="textarea" size="lg" placeholder="Enter note" />

      <Button onClick={onSave} variant="primary" className="m-4">
        Save
      </Button>
      {selectedNote && (
        <Button onClick={onDelete} variant="danger">
          Delete
        </Button>
      )}
      {status && <p>{status}</p>}
    </Form>
  )
}
