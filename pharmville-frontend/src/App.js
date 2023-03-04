import NavigationBar from "./UserComponents/NavigationBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router, Routes,
  Route,
} from "react-router-dom";
import Store from "./UserComponents/Store";
import Profile from "./UserComponents/Profile";
import Prescription from "./UserComponents/Prescription";
import Cart from "./UserComponents/Cart";
function App() {
  return (
    <Router>
      <NavigationBar />
                    <Routes>
                    <Route path="/" element={<Store/>} />
                    <Route path='/prescriptions' element={<Prescription/>} />
                    <Route path='/profile' element={<Profile/>} />
                    <Route path='/cart' element={<Cart/>} />
                    </Routes>
    </Router>
  );
}

export default App;
