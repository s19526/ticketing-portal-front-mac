import logo from '../Assets/logo.svg';
import 'jquery/dist/jquery.min'
import 'bootstrap/dist/js/bootstrap.min'
import './App.scss';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {User} from '../Components/Users/User';
import {Tasks} from '../Components/Tasks/Tasks';
import {SignIn} from '../Components/SignIn/SignIn'
import {SignUp} from '../Components/SignUp/SignUp'
import {LandingPage} from "../Components/Landing/LandingPage";
import {Navigation} from "../Components/Navigation/Navigation";


function App() {
  return (
  <BrowserRouter>
      <Navigation/>
    <div>
        <Routes>
            <Route path='/' element={<LandingPage/>} exact/>
            <Route path='tasks' element={<Tasks/>}/>
            <Route path='users' element={<User/>}/>
            <Route path='sign-in' element={<SignIn/>}/>
            <Route path='sign-up' element={<SignUp/>}/>
        </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;