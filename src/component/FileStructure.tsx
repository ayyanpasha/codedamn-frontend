import React, { useEffect, useState } from 'react';
import './FileStructureViewer.css'; // Import the CSS file
import { useParams } from 'react-router-dom';

interface FileStructure {
  [key: string]: FileStructure | null;
}

interface MyComponentProps {
  setFile: React.Dispatch<React.SetStateAction<string>>;
}

const FileStructureViewer: React.FC<MyComponentProps> = (props) => {
  const [fileStructure, setFileStructure] = useState<FileStructure | null>(null);
  const { projectId } = useParams();

  useEffect(() => {
    const ws = new WebSocket(`${process.env.REACT_APP_WS_URL}/${projectId}:1001`);

    ws.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      console.log(receivedData.toString());
      console.log(JSON.stringify(receivedData));
      setFileStructure(receivedData);
    };

    return () => {
      ws.close();
    };
  }, [projectId]);

  const handleOnClick = (
    event: React.MouseEvent<HTMLLIElement, MouseEvent>,
    path: string
  ) => {
    event.stopPropagation();
    props.setFile(path);
  };

  const toggleFolder = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
    event.stopPropagation();
    const li = event.currentTarget;
    li.classList.toggle('expanded');
  };

  const renderFileStructure = (structure: FileStructure | null) => {
    if (!structure) return null;

    return (
      <ul>
        {Object.keys(structure).map((key) => {
          const fileName = key.split('/').pop() || key;
          const isFolder = structure[key] !== null;

          return (
            <li
              key={key}
              className={isFolder ? 'folder' : 'file'}
              onClick={(event) => {
                if (isFolder) {
                  toggleFolder(event);
                } else {
                  handleOnClick(event, key);
                }
              }}
            >
              {fileName}
              {isFolder && renderFileStructure(structure[key] as FileStructure)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="file-structure-viewer">
      <h2>File Structure Viewer</h2>
      {renderFileStructure(fileStructure)}
    </div>
  );
};

export default FileStructureViewer;
