import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';

const PreviewCode: React.FC = () => {
  const [portInput, setPortInput] = useState<string>('3000');
  const [pathInput, setPathInput] = useState<string>('');
  const [url,setUrl] = useState({port: portInput ,path:pathInput});
  const { projectId } = useParams();

  // Reference to the iframe element
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Function to reload the iframe content
  const reloadIframe = () => {
    // Check if iframeRef is defined and its current property is not null
    if (iframeRef.current) {
      // Reload the iframe by setting its src attribute to its current value
      // eslint-disable-next-line
      iframeRef.current.src = iframeRef.current.src;
    }
  };

  // Function to handle port input change
  const handlePortChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPortInput(e.target.value);
  };

  // Function to handle path input change
  const handlePathChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPathInput(e.target.value);
  };

  // Function to update port and path states
  const updatePortAndPath = () => {
    // Add logic to update port and path states
    reloadIframe();
    setUrl({port: portInput, path: pathInput});
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', flex: '1', width: '40%',overflowX:'scroll'}}>
      {/* Inputs for port and path */}
      <div>
        Port: <input value={portInput} onChange={handlePortChange} />
        <br />
        Path: / <input value={pathInput} onChange={handlePathChange} />
        <br />
        <button onClick={updatePortAndPath}>Reload</button>
      </div>
<hr />
      {/* The iframe element */}
      <iframe
        ref={iframeRef}
        title="Code Preview"
        src={`http://${process.env.REACT_APP_WS_URL}:3002/?containerId=${projectId}&port=${url.port}&path=/${url.path}`}
        style={{ flex: 1 }}
      ></iframe>
    </div>
  );
};

export default PreviewCode;
