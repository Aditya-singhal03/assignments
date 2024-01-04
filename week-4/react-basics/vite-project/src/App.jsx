import { useState } from 'react'
import './App.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

function App() {
  const [title,setTitle] = useState("");
  const [description,setDescription] = useState("");
  const [editTitle,setEditTitle] = useState("");
  const [editDescription,setEditDescription] = useState("");
  const [todos,setTodos] = useState([]);
  const [open, setOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const addTodo = async ()=>{
    const todo = {
      title:title,
      description:description
    }
    setTodos(todos=>[...todos,todo]);
    setTitle("");
    setDescription("");
  }
  const handleSave = () => {
    let copyTodos = [...todos];
    console.log("---->saving", editingIndex);
    copyTodos[editingIndex].title = editTitle;
    copyTodos[editingIndex].description = editDescription;
    setTodos(copyTodos);
    setOpen(false);
    setEditingIndex(null);
  }
  const handleEdit = (idx) => {
    console.log("edit called", idx);
    setEditTitle(todos[idx].title);
    setEditDescription(todos[idx].description);
    setOpen(true);
    setEditingIndex(idx);
  }
  const handleDelete = (idx) => {
    setTodos((prevTodos) => prevTodos.filter((_, i) => i !== idx));
  };
  return (
    <>
      <input type="text" id="title" placeholder="Todo title" value={title} onChange={e=>setTitle(e.target.value)}></input> <br /><br />
      <input type="text" id="description" placeholder="Todo description" value={description} onChange={e=>setDescription(e.target.value)}></input> <br /><br />
      <button onClick={addTodo}>Add todo</button>
      <br /> <br />
      <div id="todos">
        {todos.map((todo,idx)=>(
        <div key={idx}>
          <div>{todo.title}, {todo.description}</div>
          <button onClick={()=>handleEdit(idx)}>Edit</button>
          <Popup open={open}>
            <div>
            <input type="text" value={editTitle} onChange={(e)=>setEditTitle(e.target.value)}/>
            <input type="text" value={editDescription} onChange={(e)=>setEditDescription(e.target.value)} />
            <button onClick={handleSave}>save</button>
            </div>
          </Popup>
          <button onClick={()=>handleDelete(idx)}>Delete</button>
        </div>
        ))}
      </div>
    </>
  )
}

export default App
