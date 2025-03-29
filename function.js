const appEl = document.getElementById("app");
const btnEl = document.getElementById("btn");

getNotes()?.forEach( (note) => {
   const noteElO = createNote(note.id, note.content);
   appEl.insertBefore(noteElO, btnEl);
});

function createNote (id, content) {

   const element = document.createElement("textarea");
   element.placeholder = "empty note";
   element.classList.add("note");
   element.value = content;

   element.addEventListener("dblclick", () => {
      const warning = confirm("do you want to delete this note?");
      if(warning) {
         deleteNote(id, element);
      }
   })

   element.addEventListener("input", () => {
      updateNote(id, element.value);
   })

   const deleteBtn = document.getElementById("delete-all");

   deleteBtn.addEventListener("click", () => {
      deleteAll();
   });

   return element;
}

function deleteNote(id, element) {
  const note = getNotes().filter(notes => notes.id !== id);
  saveNotes(note);
  appEl.removeChild(element);
}

function updateNote (id, content) {
  const getNote = getNotes();
  const filter = getNote.filter(note => note.id === id)[0];
  filter.content = content;
  saveNotes(getNote);
}

function addNote () {
   
   const notes = getNotes();

   const noteObj = {
      id: Math.floor(Math.random() * 1000),
      content: ""
   }

   const noteEl = createNote(noteObj.id, noteObj.content);
   appEl.insertBefore(noteEl, btnEl);

   notes.push(noteObj);
   saveNotes(notes);
}

function getNotes () {
   return JSON.parse(localStorage.getItem("notes")) || [];
}

function saveNotes (notes) {
   localStorage.setItem("notes", JSON.stringify(notes));
}

btnEl.addEventListener("click", addNote);

const footer = document.createElement("span");
footer.textContent = "© copyright 2025 WinnerTIHub, created by WinnerTIHub";
document.body.appendChild(footer);
footer.classList.add("footer");

function deleteAll () {
   localStorage.removeItem("notes");
   appEl.innerHTML = "";
   appEl.appendChild(btnEl);
}

