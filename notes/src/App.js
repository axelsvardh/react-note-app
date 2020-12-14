import 'bootstrap/dist/css/bootstrap.min.css'
import React, {useState, useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import List from './components/List'
import Form from './components/Form'
import {getNotes, createNote} from './utils/noteHelpers'
import * as N from './utils/noteHelpers'

function App() {
  const [selectedNote, setSelectedNote] = useState(undefined)
  const [notes, setNotes] = useState([])

  useEffect(() => {
    const notes = getNotes()
    setNotes(notes)
  }, [])

  const refreshList = () => {
    const notes = getNotes()
    setSelectedNote(undefined)
    setNotes([...notes])
  }

  const onClickNewNote = () => setSelectedNote(undefined)

  const jsonNoteArray = JSON.stringify(notes)

  return (
    <div>
      <Container>
        <Row>
          <Col className="p-5" style={{backgroundColor: 'lightblue', fontSize: '40px'}} xs={12}>
            Notes
          </Col>
          <Col style={{backgroundColor: 'lightgreen'}} xs={12} md={4}>
            <Button onClick={onClickNewNote} className="my-3" variant="dark" size="md" block>
              New Note
            </Button>
            <List notes={notes} selectedNote={selectedNote} setSelectedNote={setSelectedNote} />
          </Col>
          <Col style={{backgroundColor: 'lightgrey'}} xs={12} md={8}>
            <Form refreshList={refreshList} selectedNote={selectedNote} />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
