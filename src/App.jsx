
import {Route, Routes } from 'react-router-dom'
import All from './pages/All';
import Active from './pages/Active'
import Complete from './pages/Complete'

function App() {
 
  return (
    <div className="App">

      <Routes>
        <Route path='/' element= {<All />} />
        <Route path='/active' element={<Active />} />
        <Route path='/complete' element={<Complete />} />
      </Routes>

    </div>
  );
}

export default App;
