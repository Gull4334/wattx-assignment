import './App.css';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Home from './screens/Home';
import Liquidity from './screens/Liquidity';
import { Provider } from 'react-redux';
import { store } from './state/store';
import NavigationDrawer from './components/NavigationDrawer';

function App() {
  return (
    <div className="App">
      
      <Provider store={store} >
        <BrowserRouter>
        <NavigationDrawer/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Liquidity" element={<Liquidity />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
