import CanvasComponent from "@components/Canvas";

const App = () => {
  return (
    <div id="app" className="flex flex-col p-12 min-h-screen">
      <div className="bg-white-color border-4 border-black-color rounded-2xl shadow-block mb-8 h-32">
        Colors & Tools
      </div>
      <CanvasComponent />
    </div>
  );
};

export default App;
