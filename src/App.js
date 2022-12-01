import { BrowserRouter, Routes, Route } from "react-router-dom";
import Show from './Villanos/Show';
import Edit from './Villanos/Edit';

function app() {
  return (<div>

   <BrowserRouter>
      <Routes> 
            <Route path="/" element={<Show />} />
            <Route path='/edit/:id' element={ <Edit /> } />
      </Routes>
    </BrowserRouter>
  </div> 
  );
}

export default app;

