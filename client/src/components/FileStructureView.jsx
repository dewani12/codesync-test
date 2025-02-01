import { useState } from "react";
import { initialFileStructure } from "../utils/fileStructure.js";
import { AiOutlineFolder, AiOutlineFile } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { PiPencilSimpleFill } from "react-icons/pi";
import { RiFileAddLine, RiFolderAddLine } from "react-icons/ri";

function FileStructureView() {
  const [fileStructure, setFileStructure] = useState(initialFileStructure);
  const [selectedDirId, setSelectedDirId] = useState("root");

  const handleCreateFile = () => {
    const fileName = prompt("Enter file name");
    if (fileName) {
      const newFile = { id: Date.now().toString(), type: "file", name: fileName };
      setFileStructure((prev) => ({
        ...prev,
        children: [...prev.children, newFile],
      }));
    }
  };

  const handleCreateDirectory = () => {
    const dirName = prompt("Enter directory name");
    if (dirName) {
      const newDir = { id: Date.now().toString(), type: "directory", name: dirName, children: [] };
      setFileStructure((prev) => ({
        ...prev,
        children: [...prev.children, newDir],
      }));
    }
  };

  return (
    <div className="flex flex-grow flex-col text-white">
      <div className="view-title flex justify-between p-2 border-b border-gray-600">
        <h2>Files</h2>
        <div className="flex gap-2">
          <button className="rounded-md px-1 hover:bg-gray-600" onClick={handleCreateFile} title="Create File">
            <RiFileAddLine size={20} />
          </button>
          <button className="rounded-md px-1 hover:bg-gray-600" onClick={handleCreateDirectory} title="Create Directory">
            <RiFolderAddLine size={20} />
          </button>
        </div>
      </div>
      <div className="min-h-[200px] flex-grow overflow-auto">
        {fileStructure.children.map((item) => (
          <Directory key={item.id} item={item} setSelectedDirId={setSelectedDirId} />
        ))}
      </div>
    </div>
  );
}

function Directory({ item, setSelectedDirId }) {
  return (
    <div className="overflow-x-auto">
      <div className="flex w-full items-center rounded-md px-2 py-1 hover:bg-gray-600" onClick={() => setSelectedDirId(item.id)}>
        {item.type === "directory" ? <AiOutlineFolder size={24} className="mr-2 min-w-fit" /> : <AiOutlineFile size={24} className="mr-2 min-w-fit" />}
        <p className="flex-grow cursor-pointer overflow-hidden truncate" title={item.name}>
          {item.name}
        </p>
        <button className="px-1 rounded-md p-1 hover:bg-gray-700">
          <PiPencilSimpleFill size={18} />
        </button>
        <button className="px-1 text-red-500 rounded-md p-1 hover:bg-gray-700">
          <MdDelete size={20} />
        </button>
      </div>
      {item.children && item.children.length > 0 && (
        <div className="pl-4">
          {item.children.map((child) => (
            <Directory key={child.id} item={child} setSelectedDirId={setSelectedDirId} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FileStructureView;
