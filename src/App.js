import React from 'react';
import './App.css';
import {useState, useEffect} from "react";
import TranslateForm from "./components/translate-form";
import Conversions from "./components/conversions";
const hostUrl="https://quiet-brushlands-03850.herokuapp.com/";

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
    if(to && to.length>0 && text && text!==""){
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
    }else{
      alert("Please fill details")
    }
    
  }
  return (
    <div className="App">
      <TranslateForm languages={languages} translate={translate} />
      <Conversions translations={translations}/>
    </div>
  );
}

export default App;
