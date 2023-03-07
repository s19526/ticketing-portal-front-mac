import 'jquery/dist/jquery.min'
import 'bootstrap/dist/js/bootstrap.min'
import './App.scss';

import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Account} from '../Components/Account/Account';
import {Tasks} from '../Components/Tasks/Tasks';
import SignIn from '../Components/SignIn/SignIn'
import SignUp from '../Components/SignUp/SignUp'
import {Landing} from "../Components/Landing/Landing";
import NavigationBar from "../Components/Navigation/Navigation-Bar";
import {Agent} from "../Components/Agent/Agent";



function App() {
  return (
  <BrowserRouter>
      <NavigationBar/>
    <div>
        <Routes>
            <Route path='/' element={<Landing/>} exact/>
            <Route path='tasks' element={<Tasks/>}/>
            <Route path='account' element={<Account/>}/>
            <Route path='sign-in' element={<SignIn/>}/>
            <Route path='sign-up' element={<SignUp/>}/>
            <Route path='agent' element={<Agent/>}/>
        </Routes>
    </div>
  </BrowserRouter>
  );
}

export default App;