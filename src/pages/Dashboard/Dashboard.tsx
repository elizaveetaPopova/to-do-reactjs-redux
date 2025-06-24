import React, { useEffect, useState } from "react"
import {
  Button,
  Container,
  Dialog,
  List,
  ListItem,
  Typography
} from "@mui/material"
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

import { container, listItem } from './styles'
import { deleteTask, fetchTasks } from "../../redux/slices/tasks/tasksSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";


const Dashboard = () => {
  const dispatch = useAppDispatch()
  const tasksList = useAppSelector(state => state.tasks.tasks)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [])
  const [isOpen, setIsOpen] = useState(false)


  const handleOpenModal = () => {
    setIsOpen(true)
  }

  const handleCloseModal = () => {
    setIsOpen(false)
  }

  const handleTaskDeletion = (id: number | string) => {
    dispatch(deleteTask(id))
  }

  return <Container sx={container}>
    <Typography variant="h2">To Do</Typography>
    <List>
      {
        tasksList.map((task) => {
          return <ListItem sx={listItem} key={task.id}>
            {task.title}
            <button onClick={() => handleTaskDeletion(task.id)}>
              <DeleteIcon />
            </button>
          </ListItem>
        })
      }
    </List>
    <Button onClick={handleOpenModal}>
      <AddIcon />
      New Task
    </Button>
    <Dialog onClose={handleCloseModal} open={isOpen} >Hello</Dialog>
  </Container>
}

export default Dashboard