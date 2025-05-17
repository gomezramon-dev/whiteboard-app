import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import SquareIcon from "@mui/icons-material/Square";
import LinearScaleIcon from "@mui/icons-material/LinearScale";
import DeleteIcon from "@mui/icons-material/Delete";

type ButtonDef =
  | { id: string; type: "color"; color: string }
  | { id: string; type: "tool"; icon: React.ReactNode };

export const buttons: ButtonDef[] = [
  { id: "main", type: "color", color: "bg-main-color" },
  { id: "green", type: "color", color: "bg-green-color" },
  { id: "red", type: "color", color: "bg-red-color" },
  { id: "blue", type: "color", color: "bg-blue-color" },
  { id: "circle", type: "tool", icon: <CircleIcon /> },
  { id: "square", type: "tool", icon: <SquareIcon /> },
  { id: "line", type: "tool", icon: <LinearScaleIcon /> },
  { id: "delete", type: "tool", icon: <DeleteIcon /> },
];
