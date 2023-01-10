import 'jquery/dist/jquery.min'
import 'bootstrap/dist/js/bootstrap.min'
import './App.scss';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Account} from '../Components/Account/Account';
import {Tasks} from '../Components/Ticket/Tasks';
import SignIn from '../Components/SignIn/SignIn'
import SignUp from '../Components/SignUp/SignUp'
import {LandingPage} from "../Components/Landing/LandingPage";
import Navigation from "../Components/Navigation/Navigation";


function App() {
  return (
  <BrowserRouter>
      <Navigation/>
    <div>
        <Routes>
            <Route path='/' element={<LandingPage/>} exact/>
            <Route path='tasks' element={<Tasks/>}/>
            <Route path='account' element={<Account/>}/>
            <Route path='sign-in' element={<SignIn/>}/>
            <Route path='sign-up' element={<SignUp/>}/>
        </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;