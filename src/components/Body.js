import Login from "./Login";
import Browse from "./Browse";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Body = () => {
  const appRouter = createBrowserRouter([
    { path: "/", element: <Login /> },
    {
      path: "/browse",
      element: <Browse />,
    },
  ]);

  // this is kind of event-listner whenever user signs in/signs out

  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
