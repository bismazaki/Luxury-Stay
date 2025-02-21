import logo from './logo.svg';
import './App.css';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import About from './Components/About';
import Services from './Components/Services';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <About/>
      <Services/>
      
    <Home/>
    </div>
  );
}

export default App;
