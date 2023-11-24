import { useState } from 'react';
import './App.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, deleteTask, updateTask } from './Redux/taskSlice';
import Modal from 'react-bootstrap/Modal';
import { addCompleted, deleteCompleted } from './Redux/comSlice';
import Collapse from 'react-bootstrap/Collapse';
import { current } from '@reduxjs/toolkit';

function App() {

  const [task, setTask] = useState('')
  const [idnum, setIdnum] = useState(2)
  const [uptask, setUptask] = useState()
  const [editId, setEditId] = useState(null)
  const [isCom, setIsCom] = useState(false)

  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const tasks = useSelector((state) => state.task)
  console.log(tasks);
  const complete = useSelector((state) => state.com)
  console.log(complete);

  const dispath = useDispatch()

  const handleAdd = (e) => {
    e.preventDefault();
    dispath(addTask({ id: idnum, task }))
    setIdnum(idnum + 1)
    setTask('')

  }

  const handleEdit = (taskId, task) => {
    setEditId(taskId)
    setUptask(task)
    handleShow()
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    dispath(updateTask({
      id: editId,
      task: uptask
    }))
    handleClose()
  }


  const handleDelete = (id) => {
    dispath(deleteTask({ id: id }))
  }

  const handleComplete = (id, task) => {

    const current = isCom[id] || false
    setIsCom({
      ...isCom,
      [id]: !isCom
    })

    if (!current) {
      dispath(addCompleted({
        id: id,
        task: task
      }))

    }
    else {
      dispath(deleteCompleted({
        id: id
      }))
    }

  }

  return (
    <>
      <div className="main-container">
        <div className='main'>
          <h1 className='text-center'>ToDo List</h1>
          <div>
            <InputGroup className="mb-3">
              <Form.Control
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className='border outline-dark'
                style={{ color: 'white' }}
                placeholder="New Task"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <Button
                onClick={handleAdd}
                style={{ color: 'white' }}
                variant="outline-secondary"
                id="button-addon2">
                Add+
              </Button>
            </InputGroup>
          </div>
          {
            tasks?.map((task) => (
              <div className='d-flex align-items-center'>

                <input

                  type="checkbox"
                  checked={isCom[task.id] || false}
                  onChange={() => handleComplete(task.id, task.task)}
                />

                <p className={`ms-2 mt-3 ${task.checked ? 'completed' : ''}`}>{task.task}</p>

                <div className='ms-auto'>
                  <button onClick={() => handleEdit(task.id, task.task)} className='btn btn-dark'><i className='fa-solid fa-pen-to-square fa-lg'></i></button>
                  <button onClick={() => handleDelete(task.id)} className=' btn btn-dark'><i className='fa-solid fa-trash fa-lg'></i></button>
                </div>
                <Modal show={show} onHide={handleClose}>
                  <Modal.Header>
                    <Modal.Title style={{ color: 'white' }}>Edit Task</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form.Control
                      value={uptask}
                      onChange={(e) => setUptask(e.target.value)}
                      className='outline-secondary'
                      style={{ color: 'white' }}
                      placeholder="New Task"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                    />
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="primary" onClick={handleUpdate}>
                      Update
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            ))
          }
          <div>
            <Button
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}
            >
              click
            </Button>
            {
              complete?.map((com) => (
                


                  <Collapse in={open}>
                    <div id="example-collapse-text">
                      Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus
                      terry richardson ad squid. Nihil anim keffiyeh helvetica, craft beer
                      labore wes anderson cred nesciunt sapiente ea proident.
                    </div>
                  </Collapse>
                
              ))
            }

          </div>


        </div>


      </div>
    </>
  );
}

export default App;
