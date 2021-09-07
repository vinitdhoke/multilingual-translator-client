import './styles.css';
import {useState, useEffect} from "react";

function TranslateForm(props) {
  const [textToTranslate, setTextToTranslate] = useState("");
  const [showList, setShowList] = useState(false);
  const [checkedState, setCheckedState] = useState([]);
  const {languages} = props;

  useEffect(() => {
    setShowList(false);
    setCheckedState(new Array(languages.length).fill(false));
    //console.log(languages.length)
  },[languages]);

  const handleOnChange = (pos) => {
    const updatedCheckedState = checkedState.map((item, index) =>
      index === pos ? !item : item
    );
    //console.log(updatedCheckedState)
    setCheckedState(updatedCheckedState);
  };

  const getLanguageList=()=>{
    return (
      <ul className="dropdown">
        {languages.map((lang,index)=>{
          return <li key={lang.language}>
              <input type="checkbox" checked={checkedState[index]} onChange={() => handleOnChange(index)} value={lang.language} /> 
              <label> {lang.language}</label>
            </li>
        })}
        
      </ul>
    );
  }
  const translate=()=>{
    let to = checkedState.map((checked,index)=>{
      if(checked) return languages[index].language;
    }).filter(ele=>ele!==undefined)
    //console.log(selected, languages,checkedState);
    props.translate(to, textToTranslate);
  }
  return (
    <div className="TranslateForm">
      <p className="title">Multi language transaltor</p>
      <div className="form">
        <div>
          <p>Enter text</p>
          <textarea onChange={(e)=>{setTextToTranslate(e.target.value)}} className="to-translate" placeholder="Enter text to convert" />
        </div>
        <div>
          <p>Convert to</p>
          <button onClick={()=>setShowList(!showList)}>Select languages</button>
          {showList && languages && getLanguageList()}
        </div>
        <button className="btn-translate" onClick={()=>{translate()}}>Translate</button>
      </div>
    </div>
  );
}

export default TranslateForm;
