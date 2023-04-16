import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CreateTodo } from './Components/createTodo';
import { ShowTodoLlist } from './Components/showTodoLlist';
import './App.scss';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import ProfilePage from './Components/ProfilePage';

function App() {
  return (
    <div className="App-container flex h-screen w-full flex-col font-sans antialiased">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path='/' Component={LoginPage} />
          <Route exact path='/signup' Component={SignupPage} />
          <Route exact path='/profile' Component={ProfilePage} />
          <Route exact path='/dashboard' Component={ShowTodoLlist} />
          <Route exact path='/create-todo' Component={CreateTodo} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
