import React, { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { AttachAddon } from 'xterm-addon-attach';
import { useParams } from 'react-router-dom';
import 'xterm/css/xterm.css';

interface XTermProps {
  hidden: boolean;
}

const XtermComponent: React.FC<XTermProps> = (props) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const term = useRef<Terminal | null>(null);
  const fitAddon = useRef<FitAddon | null>(null);
  const attachAddon = useRef<AttachAddon | null>(null);
  const socketRef = useRef<WebSocket | null>(null); // Reference to WebSocket connection
  const { projectId } = useParams();

  useEffect(() => {
    if (terminalRef.current) {
      // Initialize terminal
      term.current = new Terminal({
        convertEol: true // Enable conversion of line endings
      });
      term.current.open(terminalRef.current);

      // Initialize addons
      fitAddon.current = new FitAddon();
      term.current.loadAddon(fitAddon.current);

      // Initialize WebSocket connection
      const socket = new WebSocket(`ws://${process.env.REACT_APP_WS_URL}:3001/${projectId}:1000`);
      socketRef.current = socket;

      // Attach WebSocket to terminal
      attachAddon.current = new AttachAddon(socket);
      term.current.loadAddon(attachAddon.current);

      // Attach event listener for resizing
      const resizeListener = () => {
        if (fitAddon.current && term.current) {
          fitAddon.current.fit();
        }
      };
      window.addEventListener('resize', resizeListener);

      // Cleanup function
      return () => {
        if (term.current) {
          term.current.dispose();
        }
        // Close WebSocket connection when component unmounts
        if (socketRef.current) {
          socketRef.current.close();
        }
        // Remove resize event listener
        window.removeEventListener('resize', resizeListener);
      };
    }
  }, [projectId]);
  console.log(props.hidden)

  return (
      <div ref={terminalRef}  style={{ height: '100%', overflow: 'auto' , flex: 1, width: '100%', display: props.hidden?'none':'block'}}/>
    
  );
};

export default XtermComponent;
