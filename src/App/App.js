import logo from '../Assets/logo.svg';
import './App.css';

import {Home} from '../Components/Home/Home';
import {Navigation} from '../Components/Navigation/Navigation';
import {User} from '../Components/Users/User';
import {Task} from '../Components/Tasks/Task';
import SignIn from '../Components/Core/SignIn'
import SignUp from '../Components/Core/SignUp'
import Landing from '../Components/TempComps/Landing'

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import MenuBar from "../Components/TempComps/MenuBar";


function App() {
  return (
  <BrowserRouter>
    <div className="container.fluid">
        <MenuBar/>
        <Navigation/>
        <Routes>
            <Route path='/' element={<Landing/>} exact/>
            <Route path='tasks' element={<Task/>}/>
            <Route path='users' element={<User/>}/>
            <Route path='sign-in' element={<SignIn/>}/>
            <Route path='sign-up' element={<SignUp/>}/>
        </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;