import "./index.css";
import "./assets/style/index.scss"
import DraggableComponent from "./components/DraggableComponent";
import Header from "./components/Header";

export default function App() {
  return (
    <>
      <Header/>
      <main>
        <DraggableComponent/>
      </main>
    </>
  );
}
