import './App.css';
import {Routes,Route, BrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import Add from './pages/Add';
import Search from './pages/Search';
import ViewAll from './pages/Viewall';
import Delete from './pages/Delete';
import Update from './pages/Update';
function App() {
  return(
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/add' element={<Add/>}></Route>
      <Route path='/srch' element={<Search />}></Route>
      <Route path='/get' element={<ViewAll/>}></Route>
      <Route path='/delete' element={<Delete />}></Route>
      <Route path='/update' element={<Update/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App;
