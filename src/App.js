import React from 'react';
import './App.css';
import {useState, useEffect} from "react";
import TranslateForm from "./components/translate-form";
import Conversions from "./components/conversions";
const hostUrl="http://localhost:3001/";

function App() {
  const [translations, setTranslations] = useState([]);
  const [languages, setLanguages] = useState([]);
  useEffect(() => {
    getLanguages();
  },[]);

  const getLanguages=()=>{
    
    fetch(hostUrl+'languages')
    .then(res=>res.json())
    //.then(data=>data.languages)
    .then((data)=>{
      //const {languages} = data;
      console.log(data.data.languages);
      setLanguages(data.data.languages);
    })
  }
  const translate=(to, text)=>{
    fetch(hostUrl+'translate', {
      method:'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({to: to, text: text})
    }).then(res=>res.json())
    .then(data=>{
      console.log(data)
      setTranslations(data);
    });
  }
  return (
    <div className="App">
      <TranslateForm languages={languages} translate={translate} />
      <Conversions translations={translations}/>
    </div>
  );
}

export default App;
