import { createBrowserRouter } from 'react-router-dom'
import { AboutView } from './views/About'
import { MenuView } from './views/Menu'
import { StudentFormView } from './views/Student/FormCreate'
import { StudentItemView } from './views/Student/FormEdit'
import { StudentListView } from './views/Student/List'

export const router = createBrowserRouter([
  { path: '/students/', element: <StudentListView /> },
  { path: '/students/new', element: <StudentFormView /> },
  { path: '/students/:id', element: <StudentItemView /> },
  { path: '/about', element: <AboutView /> },
  { path: '*', element: <MenuView /> },
])
