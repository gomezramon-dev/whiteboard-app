import LoadingScreen from "@components/LoadingScreen";
import CanvasComponent from "@components/Canvas";
import useWindowResize from "@hooks/useWindowResize";

const App = () => {
  const isResizing = useWindowResize();

  return (
    <>
      <LoadingScreen isLoading={isResizing} />
      <div className="flex flex-col p-12 min-h-screen">
        <div
          className="bg-white-color border-4 border-black-color rounded-2xl shadow-block 
        mb-8 h-32"
        ></div>
        {!isResizing && <CanvasComponent />}
      </div>
    </>
  );
};

export default App;
