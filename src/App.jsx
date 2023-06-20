import React from "react"
import "./App.css"
import {originals,action,trending,horor} from "./urls"
import Navbar from "./components/Navbar/navbar";
import Banner from "./components/Banner/Banner";
import RowPost from "./components/RowPost/RowPost";
function App() {

  return (
    
     <div className='App'>
     <Navbar/>
     <Banner/>
     <RowPost url={originals} title='Netflix Originals'/>
     <RowPost url={action} title='Action Movies' isSmall/>
     <RowPost url={trending} title='Trending' isSmall/>
     <RowPost url={horor} title='Horror Movies' isSmall/>


     </div>
    
  );
}

export default App
