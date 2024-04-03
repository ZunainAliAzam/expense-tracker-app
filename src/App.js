import './App.css';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import {Auth} from "./pages/auth/index";
import {ExpenseTracker} from "./pages/expense-page/index";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' exact element = {<Auth/>} />
          <Route path='/expense' element = {<ExpenseTracker/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
