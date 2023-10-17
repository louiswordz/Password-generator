import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import {FaKey} from 'react-icons/fa'
import { FaClipboard } from 'react-icons/fa';

function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isLowercase, setIsLowercase]=useState(false);
    const [isUppercase, setIsUppercase] = useState(false);
    const [isnumber, setIsnumber] = useState(false);
    const [israndom, setIsrandom] = useState(false);
    const [copy, setcopy] = useState(false)
    const [passwordResult, setPasswordResult] = useState('')
    const [passwordlength, setPasswordlength] = useState('')
    const textAreaRef = useRef(null)
    
    const handleThemeSwitch = (e) => {
      if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        setIsDarkMode(true);
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.setAttribute('data-theme', 'light');
        setIsDarkMode(false);
        localStorage.setItem('theme', 'light');
      }
    };
  
    useEffect(() => {
      // Check the current theme from localStorage
      const currentTheme = localStorage.getItem('theme');
      if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        setIsDarkMode(currentTheme === 'dark');
      }
    }, []);
    
    const generatePassword = () =>{
      const uppercaseChar = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const lowercaseChar = "abcdefghijklmnopqrstuvwxyz"
      const numberChar = "1234567890"
      const symbols = "~!@#$%^&*()_-+=,./"

      let characters = '';

      if(setIsUppercase) characters += uppercaseChar;
      if(setIsLowercase) characters += lowercaseChar;
      if(setIsnumber)     characters += numberChar;
      if(setIsrandom)     characters += symbols;

      if (characters) {
        let newPassword = '';
         let length = parseInt(8);
        for (let i = 0; i < length; i++) {
          newPassword += characters.charAt(Math.floor(Math.random() * characters.length));
        }
  
        setPasswordResult(newPassword);
      } else {
        setPasswordResult('Please select at least one option.');
      }
      };
    
      const copyToClipboard =()=>{
        textAreaRef.current.select();
        document.execCommand(copy);
        setcopy(true);
      }

  

  
  return (
    <div className="App">
       <nav style={{display: 'flex' ,justifyContent: 'flex-end',
  padding: '20 20'}}>
       <div className="theme-switch-wrapper">
        <label className="theme-switch" for="checkbox">
          <input type="checkbox" id="checkbox" checked={isDarkMode}
            onChange={handleThemeSwitch}/>
          <div className="slider round"></div>
        </label>
        <em>Switch Theme</em>
      </div>
       </nav>

      <div className="container">
        <h2>Password Generator</h2>
        <div className="result-container">
          <textarea id="passwordResult" ref={textAreaRef} value={passwordResult}  placeholder='click to generate'></textarea>
        </div>
        <div className="setting">
          <label>Password length</label>
          <input type="number" id="Passwordlength" onChange={()=>{setPasswordlength()}} min={4} max={20} defaultValue={passwordlength} />
        </div>
        <div className="setting">
          <label>Include Uppercase latters</label>
          <input type="checkbox" id="uppercase" checked={isUppercase} onChange={()=>{setIsUppercase(!isUppercase)}} />
        </div>
        <div className="setting">
          <label>Include lowercase letters</label>
          <input type="checkbox" id="lowercase" checked={isLowercase} onChange={()=>{setIsLowercase(!isLowercase)}}/>
        </div>
        <div className="setting">
          <label>Include numbers</label>
          <input type="checkbox" id="numbers" checked={isnumber} onChange={()=>{setIsnumber(!isnumber)}} />
        </div>
        <div className="setting">
          <label>Include symbols</label>
          <input type="checkbox" id="symbols" checked={israndom} onChange={()=>{setIsrandom(!israndom)}} />
        </div>
      </div>
      <div className="button">
        <button className="btn btn-large" onClick={generatePassword}>
          <i className="far fa-clipboard"><FaKey/>Generate</i>
        </button>
        <button className="btn" onClick={copyToClipboard}>
          <i><FaClipboard />Copy</i>
        </button>
      </div>
    </div>
   
  );
}

export default App;
