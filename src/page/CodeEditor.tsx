import React, { useState } from 'react'
import FileStructure from '../component/FileStructure'
import PreviewCode from '../component/PreviewCode'
import XtermComponent from '../component/XtermComponent'
import CodeBase from '../component/CodeBase'
import "../css/code.css";
import TerminalManagement from '../component/TerminalManagement'

const CodeEditor: React.FC = () => {
    const [file, setFile] = useState<string>("");
    const [terminal, setTerminal] = useState<number[]>([1]);
    const [currentTerminal, setCurrentTerminal] = useState<number>(1);
    
  return (
    <div className="root-container">
        <FileStructure setFile={setFile} />
      <div className="right">
        <div className="right-top">
          <CodeBase file={file} />
          <PreviewCode />
        </div>
        <div className="right-bottom">
            <div className='terminal'>
                {
                    terminal.map((e) => (e === currentTerminal)?<XtermComponent key={e} hidden={false}/>:<XtermComponent key={e} hidden={true}/>)
                }
          <TerminalManagement currentTerminal={currentTerminal} terminal={terminal} setTerminal={setTerminal} setCurrentTerminal={setCurrentTerminal}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CodeEditor