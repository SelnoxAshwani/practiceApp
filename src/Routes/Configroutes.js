import Home from "../Pages/Home/Index";
import Login from "../Pages/Login/Index";
import Signup from "../Pages/Signup";

const routesconfig =[
    {
        path:"/",
        element:<Home/>
    },
    {
        path:"/login",
        element:<Login/>
    },
    {
        path:"/signup",
        element:<Signup/>
    },
]
export default routesconfig