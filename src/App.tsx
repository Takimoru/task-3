import Header from "./components/Header";
import { DialogDemo } from "./components/Dialog";

function App() {
  // handleDelete sekarang akan memanggil deleteTask dari context
  return (
    <>
      <Header></Header>
      <DialogDemo></DialogDemo>
    </>
  );
}

export default App;
