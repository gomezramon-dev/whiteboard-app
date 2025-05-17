// src/App.tsx
import React, { useState } from "react";
import LoadingScreen from "@components/LoadingScreen";
import CanvasComponent from "@components/Canvas";
import useWindowResize from "@hooks/useWindowResize";
import { buttons } from "@data/Buttons";
import type { ShapeType } from "@utils/factory/ShapeFactory";

const colorMap: Record<string, string> = {
  main: "#FDBD02",
  green: "#C0FD02",
  red: "#FD4002",
  blue: "#0242FD",
};

const App: React.FC = () => {
  const isResizing = useWindowResize();
  const [tool, setTool] = useState<ShapeType | "delete">("circle");
  const [color, setColor] = useState<string>(colorMap.main);

  const baseButtonClass =
    "border-4 border-black-color hover:border-dashed active:brightness-75 active:mt-2 rounded-xl md:rounded-2xl shadow-block h-12 w-12 md:h-15 md:w-15";

  return (
    <>
      <LoadingScreen isLoading={isResizing} />
      <div className="flex flex-col p-12 min-h-screen">
        <div
          className="bg-white-color border-4 border-black-color rounded-2xl shadow-block mb-8
                     sm:h-32 sm:px-6 sm:flex sm:flex-row sm:justify-center sm:space-x-4
                     h-40 grid grid-cols-4 place-items-center"
        >
          {buttons.map((btn) => {
            const bgClass = btn.type === "color" ? btn.color : "bg-white";
            return (
              <button
                key={btn.id}
                className={`${bgClass} ${baseButtonClass}`}
                onClick={() => {
                  if (btn.type === "color") {
                    setColor(colorMap[btn.id] || colorMap.main);
                  } else {
                    setTool(btn.id as ShapeType | "delete");
                  }
                }}
              >
                {btn.type === "tool" ? btn.icon : null}
              </button>
            );
          })}
        </div>
        {!isResizing && <CanvasComponent tool={tool} color={color} />}
      </div>
    </>
  );
};

export default App;
