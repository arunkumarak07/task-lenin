import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import MyWorkBoards from "./components/MyWorkBoards.jsx";
import CreateWorkBoards from "./components/CreateWorkBoards.jsx";
import DragDrop from "./components/DragDrop.jsx";

// Defining routes with optional loaders (if needed for data fetching)
const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/my-workboards",
    element: <MyWorkBoards />,
  },
  {
    path: "/create-workboards",
    element: <CreateWorkBoards />,
  },
  {
    path: "/task-board",
    element: <DragDrop />,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
