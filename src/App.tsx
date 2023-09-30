import AccessPage from './pages/access/AccessPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import TodoPage from './pages/todo/TodoPage';
import { useEffect } from 'react';
import { LocalStorageService } from './Services/LocalStorageService';

function App() {
  const navigate=useNavigate()
  useEffect(()=>{
    const IsLogined =LocalStorageService.GetLocalStorageData()
    if(IsLogined){
      navigate('/todo')
    }else{
      navigate('/')
    }
  },[])
  return (
    <>
    <Routes>
      <Route path='/' element={<AccessPage/>}/>
      <Route path='/todo' element={<TodoPage/>}/>
    </Routes>
    </>
  );
}

export default App;
