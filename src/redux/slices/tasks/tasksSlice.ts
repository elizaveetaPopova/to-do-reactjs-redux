import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { tasks } from "../../../mockData";

interface Task {
  id: string | number,
  title: string,
  description: string,
  isCompleted: boolean
}

interface InitialState {
  isLoading: boolean,
  tasks: Task[],
  error: null | string
}

const initialState: InitialState = {
  isLoading: false,
  tasks: [],
  error: null
}

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    const response = await Promise.resolve().then(() => {
      return { data: tasks }
    })
    return response.data
  }
)

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    }
  },
  extraReducers: (builder => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.isLoading = false
      state.tasks = action.payload
    })
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.payload as string
    })
  })
})

export const { deleteTask } = tasksSlice.actions
export default tasksSlice.reducer
