import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { initialFileStructure } from "../utils/fileStructure.js";
import { AiOutlineFolder, AiOutlineFolderOpen, AiOutlineFile } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { PiPencilSimpleFill } from "react-icons/pi";
import { RiFileAddLine, RiFolderAddLine } from "react-icons/ri";

function FileStructureView() {
  const [fileStructure, setFileStructure] = useState(initialFileStructure);
  const [selectedDirId, setSelectedDirId] = useState(null);
  const [openDirectories, setOpenDirectories] = useState({});

  const toggleDirectory = (id) => {
    setOpenDirectories((prev) => {
      const isCurrentlyOpen = prev[id];
      const newOpenDirectories = { ...prev, [id]: !isCurrentlyOpen };

      if (isCurrentlyOpen) {
        setSelectedDirId(null);
      }
  
      return newOpenDirectories;
    });
  };

  const handleCreateFile = () => {
    const fileName = prompt("Enter File name");
    if (!fileName) return;
    const newFile = { id: uuidv4(), type: "file", name: fileName };

    setFileStructure((prev) => {
      const addFile = (dir) => {
        if (dir.id === selectedDirId && dir.type === "directory" && openDirectories[dir.id]) {
          return { ...dir, children: [...(dir.children || []), newFile] };
        }
        if (dir.children) {
          return { ...dir, children: dir.children.map(addFile) };
        }
        return dir;
      };

      return selectedDirId ? addFile(prev) : { ...prev, children: [...prev.children, newFile] };
    });
  };

  const handleCreateDirectory = () => {
    const dirName = prompt("Enter Folder name");
    if (!dirName) return;
    const newDir = { id: uuidv4(), type: "directory", name: dirName, children: [] };

    setFileStructure((prev) => {
      const addDirectory = (dir) => {
        if (dir.id === selectedDirId && dir.type === "directory" && openDirectories[dir.id]) {
          return { ...dir, children: [...(dir.children || []), newDir] };
        }
        if (dir.children) {
          return { ...dir, children: dir.children.map(addDirectory) };
        }
        return dir;
      };

      return selectedDirId ? addDirectory(prev) : { ...prev, children: [...prev.children, newDir] };
    });
  };

  return (
    <div className="flex flex-grow flex-col text-white h-screen">
      <div className="flex justify-between p-2 border-b border-gray-600">
        <h2>Files</h2>
        <div className="flex gap-2">
          <button className="rounded-md px-1 hover:bg-gray-600" onClick={handleCreateFile} title="New File...">
            <RiFileAddLine size={20} />
          </button>
          <button className="rounded-md px-1 hover:bg-gray-600" onClick={handleCreateDirectory} title="New Folder...">
            <RiFolderAddLine size={20} />
          </button>
        </div>
      </div>
      <div className="flex-grow overflow-y-auto">
        {fileStructure.children.map((item) => (
          <Directory key={item.id} item={item} setSelectedDirId={setSelectedDirId} toggleDirectory={toggleDirectory} openDirectories={openDirectories} />
        ))}
      </div>
    </div>
  );
}

function Directory({ item, setSelectedDirId, toggleDirectory, openDirectories }) {
  return (
    <div className="overflow-x-auto">
      <div className="flex w-full items-center rounded-md px-2 py-1 hover:bg-gray-600" onClick={() => {
        setSelectedDirId(item.id);
        toggleDirectory(item.id);
      }}>
        {item.type === "directory" ? (
          openDirectories[item.id] ? <AiOutlineFolderOpen size={24} className="mr-2 min-w-fit" /> : <AiOutlineFolder size={24} className="mr-2 min-w-fit" />
        ) : (
          <AiOutlineFile size={24} className="mr-2 min-w-fit" />
        )}
        <p className="flex-grow cursor-pointer overflow-hidden truncate" title={item.name}>{item.name}</p>
        <button className="px-1 rounded-md p-1 hover:bg-gray-700">
          <PiPencilSimpleFill size={18} />
        </button>
        <button className="px-1 text-red-500 rounded-md p-1 hover:bg-gray-700">
          <MdDelete size={20} />
        </button>
      </div>
      {item.children && openDirectories[item.id] && (
        <div className="pl-4">
          {item.children.map((child) => (
            <Directory key={child.id} item={child} setSelectedDirId={setSelectedDirId} toggleDirectory={toggleDirectory} openDirectories={openDirectories} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FileStructureView;
