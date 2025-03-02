import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';

import Items from './Components/Items';
import ItemDetails from './Components/ItemDetails'; // Import for item detail view
import Trades from './Components/Trades';
import AddItem from './Components/AddItem';
import Adminpage from './Components/Adminpage';
import EditItem from './Components/EditItem';
import MyTrades from './Components/MyTrades';
import MyItems from './Components/MyItems';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to signup */}
        <Route path="/" element={<Navigate to="/signup" />} />

        {/* Authentication Routes */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />

        {/* Main App Routes */}
        <Route path="/home" element={<Home />} />
        
        <Route path="/items" element={<Items />} />
        <Route path='/my-items' element={<MyItems/>}/>
        <Route path="/item/:id" element={<ItemDetails />} /> {/* Item details route */}
        <Route path="/trade/:id" element={<Trades />} />
        <Route path="/trades" element={<MyTrades />} />
        <Route path="/add-item" element={<AddItem />} />
        <Route path="/edit-item/:id" element={<EditItem />} />


        {/* Admin Route */}
        <Route path="/admin" element={<Adminpage />} />
      </Routes>
    </Router>
  );
}

export default App;
