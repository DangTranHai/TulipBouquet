import { Routes, Route } from "react-router-dom";
import WriteWish from "./components/WriteWish";
import OpenWish from "./components/OpenWish";
import TulipBouquet from "./components/TulipBouquet";

function App() {

  const params = new URLSearchParams(window.location.search);
  const message = params.get("msg");

  return (
    <Routes>

      <Route path="/" element={
        message ? <OpenWish /> : <WriteWish />
      }/>

      <Route path="/tulip" element={<TulipBouquet />} />
      

    </Routes>
  );
}

export default App;