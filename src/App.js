import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";

function App() {
  return (
    <div className="App">
      <Navbar logoName="Word editor" />
      <Home />
    </div>
  );
}

export default App;
