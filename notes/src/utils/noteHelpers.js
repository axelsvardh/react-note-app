// C: Create a note
// R: Read (get) a note
// U: Update a note
// D: Delete a note

function initializeNotes() {
  localStorage.setItem('notes', JSON.stringify([]))
  return []
}
// const notes = [
//   {id: 1, title: 'hello', body: 'hejhejhej'},
//   {id: 2, title: 'another note', body: 'hallåhallåhallå'},
//   {id: 3, title: 'new notes', body: 'tjenatjenatjena'},
// ]
// const notes = [{id: '123', title: 'another note', body: 'new note'}]

// localStorage.setItem('notes', '[]')
// const test = localStorage.getItem('notes')

export function getNotes() {
  const Axelsnote = localStorage.getItem('notes')
  if (!Axelsnote) {
    return initializeNotes()
  }
  const parsedNotes = JSON.parse(Axelsnote)
  return parsedNotes
}

// export function createNote(title, body) {
//   const notes = getNotes()
//   const note = {id: Date.now(), title, body}
//   notes.push(note)
//   console.log('about to save', notes)
//   const jsonNoteArray = JSON.stringify(notes)
//   localStorage.setItem('notes', jsonNoteArray)
// }

export function createNote(title, body) {
  const notes = getNotes()
  const newNote = {
    id: Date.now(),
    title,
    body,
  }
  notes.push(newNote)
  const jsonNoteArray = JSON.stringify(notes)
  localStorage.setItem('notes', jsonNoteArray)
  // return note
}

export function getNote(id) {
  const notes = getNotes()
  return notes.find((note) => note.id === id)
}

export function updateNote(id, title, body) {
  const notes = getNotes()
  const indexToUpdate = notes.findIndex((note) => note.id === id)
  const note = {
    id,
    title,
    body,
  }

  notes.splice(indexToUpdate, 1)
  notes.splice(0, 0, note)
  const jsonNoteArray = JSON.stringify(notes)
  localStorage.setItem('notes', jsonNoteArray)
  return note
  //notes.find(element => element.id === id || element => element.title )
}

// const payload = {id: 3, title: 'hello', body: ''}
// updateNote(payload)

export function deleteNote(id) {
  const notes = getNotes()
  const indexToDelete = notes.findIndex((note) => note.id === id)
  if (indexToDelete >= 0) notes.splice(indexToDelete, 1)
  const jsonNoteArray = JSON.stringify(notes)
  localStorage.setItem('notes', jsonNoteArray)
  return true
}
