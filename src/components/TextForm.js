import React, { useState } from 'react'

export default function TextForm(props) {

    const handleUpClick = () => {
        // console.log("Uppercase was clicked : " + text);
        let newText = text.toUpperCase();
        setText(newText);
    }
    const handleLowClick = () => {
        // console.log("Lowercase was clicked : " + text);
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Text converted to lowercase!", "success");
    }

    const handleOnChange = (event) => {
        // console.log("On change");
        setText(event.target.value);
    }

    const handleClearClick = () => {
        // console.log("Clear was clicked : " + text);
        let newText = '';
        setText(newText);
        props.showAlert("Text cleared!", "success");
    }
    const speak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
        props.showAlert("Text is being spoken!", "success");
    }

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            props.showAlert("Text copied to clipboard!", "success");
        } catch (error) {
            console.error(error);
            props.showAlert("Failed to copy!", "danger");
        }
    };

    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed!", "success");
    }
    
    const [text, setText] = useState('');
    return (
        <>
            <div className="container" style={{color: props.mode === 'dark' ? 'white' : '#042743'}}>
                <div className="mb-3">
                    <h1>{props.heading}</h1>
                    <textarea className="form-control" id="myBox" rows="8" onChange={handleOnChange} value={text} style={{backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743'}}></textarea>
                </div>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleLowClick}>Convert to Lowercase</button>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleClearClick}>Clear Text</button>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={speak}>Speak</button>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleCopy}>Copy Text</button>
                <button disabled={text.length===0} className="btn btn-primary mx-2 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>

            </div>
            <div className="container my-3" style={{color: props.mode === 'dark' ? 'white' : '#042743'}}>
                <h1>Your Text Summary</h1>
                <p>{text.split(" ").filter((element)=>{return element.length!==0}).length} word and {text.length} characters</p>
                <p>{0.008 * text.split(" ").filter((element)=>{return element.length!==0}).length} minutes read</p>
                <h2>Preview</h2>
                <p>{text.length > 0 ? text : "Nothing to preview"}</p>
            </div>
        </>
    )
}
