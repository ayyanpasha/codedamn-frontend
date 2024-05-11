import React, { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useParams } from "react-router-dom";

interface MyComponentProps {
  file: string;
}

const CodeBase: React.FC<MyComponentProps> = (props) => {
  const [currentFile, setCurrentFile] = useState<string>("");
  const [language, setLanguage] = useState<string>("");
  const [code, setCode] = useState<string>(props.file);
  const [fileArray, setFileArray] = useState<string[]>([]);
  const { projectId } = useParams();
  const [ws, setWs] = useState(
    new WebSocket(
      `ws://${process.env.REACT_APP_WS_URL}:3001/${projectId}:1002?filePath=${currentFile}`
    )
  );

  // Function to handle editor change
  const handleEditorChange = (
    newValue: string | undefined,
    event: any
  ): void => {
    if (typeof newValue === "string") {
      setCode(newValue);
    }
  };

  useEffect(() => {
    const fileExtension = getFileExtension(currentFile);
    if (fileExtension === undefined) {
      setLanguage("plaintext");
    } else {
      setLanguage(getLanguage(fileExtension));
    }
    const socketURL = `ws://${process.env.REACT_APP_WS_URL}:3001/${projectId}:1002?filePath=${currentFile}`;
    console.log(socketURL);
    setWs(new WebSocket(socketURL));
  }, [currentFile, projectId]);

  useEffect(() => {
    setFileArray((currentFileArray) => {
      if (!currentFileArray.includes(props.file) && props.file !== "") {
        currentFileArray.push(props.file);
      }
      return currentFileArray;
    });
    setCurrentFile(props.file);
  }, [props.file]);

  useEffect(() => {
    ws.onopen = () => {
      console.log("Connected to WebSocket server");
    };

    ws.onmessage = (event) => {
      setCode(event.data);
    };

    return () => {
      ws.close();
    };
  }, [ws]);

  useEffect(() => {
    // Function to send a WebSocket message
    const sendMessage = () => {
      if (ws) {
        const message = code;
        ws.send(message);
      } else {
        console.error("WebSocket connection not established");
      }
    };

    let intervalId = setInterval(sendMessage, 500);

    return () => {
      clearInterval(intervalId);
    };
  }, [ws, code]);

  return (
    <div style={{  height: "100%", flex: 3, width: '60%'}}>
      <div style={{ backgroundColor: "#141313",display: 'flex' ,overflowX: 'auto', width: '100%'}}>
        {fileArray.map((fileElement) => (
            <div
            style={{
                flexShrink: 0 ,
                backgroundColor: "grey",
                padding: "2px",
                marginRight: "1px",
                color: "white",
            }}
            >
            <button
              style={{
                  border: "none",
                  backgroundColor: "#141313",
                  color: "white",
                }}
                onClick={() => setCurrentFile(fileElement)}
                >
              {fileElement.slice(6)}
            </button>
            <button
              style={{
                  border: "none",
                  backgroundColor: "#141313",
                  color: "white",
                }}
                onClick={() => {
                    setFileArray((currentFileArray) => {
                        currentFileArray = currentFileArray.filter(
                            (e) => e !== fileElement
                        );
                        return currentFileArray;
                    });
                }}
                >
              X
            </button>
          </div>
        ))}
      </div>
      {/* {props.file.slice(5)} */}
        <Editor
          height="100%"
          width="100%"
          theme="vs-dark"
          path={currentFile}
          value={code}
          onChange={handleEditorChange}
          language={language} // Set language dynamically
          options={{
            wordWrap: "on",
            scrollbar: {
              vertical: "hidden",
            },
          }}
        />
    </div>
  );
};

function getFileExtension(filename: string) {
  return filename.split(".").pop();
}

function getLanguage(fileExtension: string): string {
  let language = "plaintext"; // Default to plaintext if no language is matched
  switch (fileExtension) {
    case "js":
      language = "javascript";
      break;
    case "html":
      language = "html";
      break;
    case "css":
      language = "css";
      break;
    case "py":
      language = "python";
      break;
    case "java":
      language = "java";
      break;
    case "cpp":
      language = "cpp";
      break;
    case "c":
      language = "c";
      break;
    case "php":
      language = "php";
      break;
    case "rb":
      language = "ruby";
      break;
    case "go":
      language = "go";
      break;
    case "swift":
      language = "swift";
      break;
    case "rs":
      language = "rust";
      break;
    case "kt":
      language = "kotlin";
      break;
    case "pl":
      language = "perl";
      break;
    case "lua":
      language = "lua";
      break;
    case "sh":
      language = "shell";
      break;
    case "json":
      language = "json";
      break;
      case 'md':
    language = 'markdown';
    break;
    // Add more cases for other file extensions as needed
  }
  return language;
}

export default CodeBase;
