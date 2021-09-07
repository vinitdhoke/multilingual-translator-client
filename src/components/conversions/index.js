import './styles.css';

function Conversions(props) {
  const translationsCard=()=>{
    console.log(props.translations[0].translations);
    const {translations} = props;
    return (
      translations[0].translations.map((ele)=>{
        return (<div key={ele.to} className="card">
            <div>{ele.to}</div>
            <div>{ele.text}</div>
          </div>)
      })
    )
  }
  return (
    <div className="Conversions">
      <p>Conversions</p>
      <div>
        {props.translations && props.translations[0] && props.translations[0].translations && translationsCard()}
      </div>
    </div>
  );
}

export default Conversions;
