import React, {useState} from 'react'


export default function TextForm(props) {
  const [text, setText] = useState('');
  // eslint-disable-next-line
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleUpClick = ()=>{
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Text is converted into UpperCase !" , "success")
  }

  const handleLoClick = ()=>{
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Text is converted into LowerCase !" , "success")
  }

  const replacecasefunc = () => {
    let existing_text = prompt("Enter which word to replace : ");
    let replaced_text = prompt("Enter New Text");
    setText(text.replaceAll(existing_text, replaced_text))
    props.showAlert("All " + existing_text + " are replaced by " + replaced_text + " !" , "success")
  }

  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
    setIsSpeaking(true);
    props.showAlert("Speaking mode is ON!" , "success")
  }

  const stop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    props.showAlert("Speaking mode is OFF now !" , "success")
  };
  
  const handleExtraSpaces = () => {
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("All the Extra Spaces are removed now!" , "success")
  }

  const clear = ()=>{
    setText("");
  }

  const handleOnChange = (event)=>{
    setText(event.target.value);
  }

  return (
    <>
    <div className="container" style={{color: props.mode === 'dark' ? 'white' : 'black'}}>
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="8" style={{backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color : props.mode === 'dark' ? 'white' : 'black'}}></textarea>
        </div>
    </div>    
    
    <button disabled={text.length === 0} className="btn btn-primary btn-block mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
    <button disabled={text.length === 0} className="btn btn-primary btn-block mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
    <button disabled={text.length === 0} className="btn btn-primary btn-block mx-1 my-1" onClick={replacecasefunc}>Replace</button>
    <div className="btn-group mx-1 my-1" role="group" aria-label="Basic example">
      <button disabled={text.length === 0} type="button" className="btn btn-primary" onClick={speak}>Speak</button>
      <button disabled={text.length === 0} type="button" className="btn btn-success" onClick={stop}>Stop</button>
    </div>
    <button disabled={text.length === 0} className="btn btn-primary btn-block mx-1 my-1" onClick={handleExtraSpaces}>HandleExtraSpaces</button>
    <button disabled={text.length === 0} className="btn btn-primary btn-block mx-1 my-1" onClick={clear}>Clear All</button>

    
    <div className="container my-3" style={{color: props.mode === 'dark' ? 'white' : 'black'}}>
        <h2>Your text summary</h2>
        <p>{text.split(/\s+/).filter((e) => {return e.length!==0}).length} words and {text.length} characters</p>
        <p>{0.008 * text.split(/\s+/).filter((e) => {return e.length!==0}).length} Minutes read</p>
        <h2>Preview</h2>
        <p>{text.length > 0? text: "Enter something in the textbox above to preview it here"}</p>
    </div>
    </>
  )
}
