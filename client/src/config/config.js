export const COMPILER_BASEURL = "https://emkc.org/api/v2/piston";

export const languageOptions = [
  {
    language: "c",
    version: "10.2.0",
    aliases: ["gcc"],
    runtime: "gcc",
  },
  {
    language: "c++",
    version: "10.2.0",
    aliases: ["cpp", "g++"],
    runtime: "gcc",
  },
  {
    language: "java",
    version: "15.0.2",
    aliases: [],
  },
  {
    language: "kotlin",
    version: "1.8.20",
    aliases: ["kt"],
  },
  {
    language: "csharp",
    version: "6.12.0",
    aliases: ["mono", "mono-csharp", "mono-c#", "mono-cs", "c#", "cs"],
    runtime: "mono",
  },
  {
    language: "javascript",
    version: "18.15.0",
    aliases: ["node-javascript", "node-js", "javascript", "js"],
    runtime: "node",
  },
  {
    language: "python",
    version: "3.10.0",
    aliases: ["py", "py3", "python3", "python3.10"],
  }
];

export const customMapping = {
  c: "clike",            
  cpp: "clike",          
  csharp: "clike",       
  java: "java",          
  javascript: "javascript", 
  kotlin: "clike",       
  python: "python"       
};

