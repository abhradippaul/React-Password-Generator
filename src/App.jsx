import { useRef, useState } from "react";
import "./App.css";
import { useCallback } from "react";
import { useEffect } from "react";
function App() {
  let passwordRef = useRef(null);
  const [length, setlength] = useState(8);
  const [numberAllow, setNumberAllow] = useState(false);
  const [characterAllow, setCharacterAllow] = useState(false);
  const [password, setPassword] = useState("");
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";
    if (numberAllow) {
      str += "1234567890";
    }
    if (characterAllow) {
      str += "!@#$%^&*()";
    }
    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllow, characterAllow]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllow, characterAllow]);
  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <div className="card">
      <div className="input-box">
        <input type="text" value={password} readOnly ref={passwordRef} />
        <button onClick={copyPassword}>Copy</button>
      </div>
      <div className="input-info">
        <input
          type="range"
          min={6}
          max={30}
          value={length}
          onChange={(e) => {
            setlength(e.target.value);
          }}
        />
        <h3>Length({length})</h3>
        <input
          type="checkbox"
          id="number_checkbox"
          defaultChecked={numberAllow}
          onChange={() => {
            setNumberAllow((prev) => !prev);
          }}
        />
        <label htmlFor="number_checkbox">
          <h3>Numbers</h3>
        </label>
        <input
          type="checkbox"
          id="character_checkbox"
          defaultChecked={characterAllow}
          onChange={() => {
            setCharacterAllow((prev) => !prev);
          }}
        />
        <label htmlFor="character_checkbox">
          <h3>Characters</h3>
        </label>
      </div>
    </div>
  );
}

export default App;
