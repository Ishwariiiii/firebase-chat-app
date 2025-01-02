
// import ChatBox from './Components/ChatBox';
// import NavBar from './Components/Navbar';
// import { auth } from "./firebase";
// import { useAuthState } from "react-firebase-hooks/auth";
// function App() {

//   return (
//     <div className="App">
//       <NavBar />
//       <ChatBox/>
//     </div>
//   );
// }
// export default App;

// import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import "./App.css";
// import NavBar from "./components/NavBar";
// import ChatBox from "./components/ChatBox";
// import { auth } from "./firebase";
import ChatBox from "./Components/ChatBox";
import Navbar from "./Components/Navbar"
import { auth } from "./firebase";
import Welcome from "./Components/Welcome";

function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">
      <Navbar />
      {!user ? <Welcome /> : <ChatBox />}
      {/* <ChatBox /> */}
    </div>
  );
}
export default App;