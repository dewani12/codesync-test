import { v4 as uuidv4 } from "uuid";

export const initialFileStructure = {
  name: "root",
  id: uuidv4(),
  type: "file",
  children: [
    {
      id: "1",
      type: "file",
      name: "index.js"
    }
  ],
};