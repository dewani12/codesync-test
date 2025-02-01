import { v4 as uuidv4 } from "uuid";

const initialCode = `function helloWorld(name) {
  console.log("Hello World", name);
}
  
helloWorld("Michael Sipser");`

export const initialFileStructure = {
    name: "root",
    id: uuidv4(),
    type: "directory",
    children: [
        {
            id: uuidv4(),
            type: "file",
            name: "index.js",
            content: initialCode,
        }
    ],
};