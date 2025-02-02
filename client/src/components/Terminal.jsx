import { useState, useEffect } from "react";
import { executeCode } from "../utils/pistonApi.js";
import { languageOptions } from "../config/config.js";

function Terminal({ editorRef, socketRef, roomId }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [language, setLanguage] = useState("");
  const [langVersion, setLangVersion] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const curRef = socketRef.current;
    if (!curRef) {
      console.log("Socket not initialized check");
      return;
    }
    console.log("Socket initialized");
    const handleInputTerminalChanges = (input) => {
      console.log("Received input terminal : ", input);
      setInput(input);
    };
    const handleOutputTerminalChanges = (output) => {
      console.log("Received output terminal : ", output);
      setOutput(output);
    };
    const handleLanguageChange = (lang,langVersion) => {
        setLanguage(lang);
        setLangVersion(langVersion);
    };
    curRef.on("recieve-input", handleInputTerminalChanges);
    curRef.on("recieve-output", handleOutputTerminalChanges);
    curRef.on("recieve-lang", handleLanguageChange);
    // return () => {
    //   if (socketRef.current) {
    //     curRef.off("recieve-input", handleInputTerminalChanges);
    //     curRef.off("recieve-output", handleOutputTerminalChanges);
    //   }
    // };
  }, [socketRef]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
    socketRef.current.emit("input-change", { roomId, input: e.target.value });
  };

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      const { run: result } = await executeCode(
        language,
        langVersion,
        sourceCode,
        input
      );
      setOutput(result.output);
      socketRef.current.emit("output-change", {
        roomId,
        output: result.output,
      });
    } catch (error) {
      setOutput(error.message);
    }
  };

  const handleLanguageSelect = (lang, version) => {
    setLanguage(lang);
    setLangVersion(version);
    setMenuOpen(false);
    socketRef.current.emit("languageChange", { roomId, lang, langVersion: version });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".relative")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="py-1 flex flex-col">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button
            className="p-2 ml-2 bg-blue-500 hover:bg-blue-700 text-white rounded cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {language
              ? language
              : `Select Language ${String.fromCharCode(9660)}`}
          </button>
          {menuOpen && (
            <div className="absolute mt-2 w-48 bg-white border rounded shadow-lg max-h-48 overflow-y-auto z-99">
              {languageOptions.map((lang, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-200 cursor-pointer flex justify-between items-center"
                  onClick={() =>
                    handleLanguageSelect(lang.language, lang.version)
                  }
                >
                  <span>{lang.language}</span>
                  <span className="text-[12px] text-gray-600">
                    {lang.version}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        <button
          className="w-24 p-2 bg-blue-500 hover:bg-blue-700 text-white rounded cursor-pointer"
          onClick={runCode}
        >
          Run Code
        </button>
      </div>
      <textarea
        id="input"
        onChange={handleInputChange}
        value={input}
        placeholder="Write your input here..."
        className="h-30 p-2 mt-2 bg-[#3D404A] text-sm text-white resize-none focus:outline-none mx-2"
      ></textarea>
      <textarea
        id="output"
        value={output}
        className="h-44 p-2 mt-1 bg-[#3D404A] text-sm text-white resize-none focus:outline-none mx-2"
        readOnly
      ></textarea>
    </div>
  );
}

export default Terminal;
