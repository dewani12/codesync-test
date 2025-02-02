import { useEffect, useRef } from "react";
import Codemirror from "codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/theme/dracula.css";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";

function Editor({ editorRef, socketRef, roomId }) {
  if (!socketRef.current) {
    console.log("Socket not initialized check 1");
  }

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = Codemirror.fromTextArea(
        document.getElementById("editor"),
        {
          mode: "javascript",
          theme: "dracula",
          autoCloseBrackets: true,
          autoCloseTags: true,
          lineNumbers: true,
        }
      );
      editorRef.current.setSize(null, window.innerHeight + "px");
      editorRef.current.on("change", (instance, changes) => {
        const { origin } = changes;
        const code = instance.getValue();
        if (origin !== "setValue") {
          socketRef.current.emit("code-change", { roomId, code });
        }
      });
    }
  });

  useEffect(() => {
    if (!socketRef.current) {
      console.log("Socket not initialized check 2");
      return;
    }
    console.log("Socket initialized");
    const handleReceiveChanges = (code) => {
      console.log("Received codes : ", code);
      if (editorRef.current) {
        if (editorRef.current.getValue() !== code) {
          editorRef.current.setValue(code);
        }
      }
    };
    socketRef.current.on("recieve-changes", handleReceiveChanges);
    return () => {
      if (socketRef.current) {
        socketRef.current.off("recieve-changes", handleReceiveChanges);
      }
    };
  }, [socketRef]);

  return <textarea id="editor"></textarea>;
}

export default Editor;
