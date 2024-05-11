import React, { useState } from "react";

interface TerminalInterface {
  currentTerminal: number;
  terminal: number[];
  setTerminal: React.Dispatch<React.SetStateAction<number[]>>;
  setCurrentTerminal: React.Dispatch<React.SetStateAction<number>>;
}

const TerminalManagement: React.FC<TerminalInterface> = (props) => {
  const [counter, setCounter] = useState(2);
  return (
    <div style={{ backgroundColor: "#141414", color: "white", height: '100%', display:'flex', flexDirection:'column', overflowY: 'auto', width: '9%'}}>
      Terminal{" "}
      <button
        onClick={() =>
          props.setTerminal((e) => {
            e.push(counter);
            setCounter(counter + 1);
            console.log(counter);
            return e;
          })
        }
      >
        +
      </button>
      {props.terminal.map((terminalId) => (
        <div
          style={{
            border: "1px solid white",
            display: "flex",
            backgroundColor: (props.currentTerminal === terminalId)?'grey':'',
            justifyContent: "space-between",
          }}
          onClick={() => props.setCurrentTerminal(terminalId)}
        >
          {terminalId}
          <button
            onClick={(event) => {
              event.stopPropagation();
              if (props.terminal.length === 1) return;
              props.setTerminal((currentArray) => {
                const returnArray = currentArray.filter(
                  (e) => e !== terminalId
                );
                if (props.currentTerminal === terminalId)
                  props.setCurrentTerminal(returnArray[0]);
                return returnArray;
              });
            }}
          >
            {" "}
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default TerminalManagement;
