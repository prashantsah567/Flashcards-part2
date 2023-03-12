import React, {useState} from "react";
import "./FlashCard.css";
import codeSnippet from '../assets/codeSnippet.png';
import {FlashcardsData} from "./QAdata";

const FlashCard = () => {
    const [isFlipped, setIsFlipped] = useState(false); //when card is flipped
    const [backgroundColor, setBackgroundColor] = useState('#ed7d45'); //background color for flashcard
    const [currentCardIndex, setCurrentCardIndex] = useState(0); //value of current card index
    const currentFlashcard = FlashcardsData[currentCardIndex]; //current flashcard
    const [imageOnCard, setImageOnCard] = useState(true); //for the image on flashcard
    const [inputValue, setInputValue] = useState(""); //for input
    const [count,setCount] = useState(0); //to count the current streak
    const colors = ['#42b6f5', '#7542f5', '#f5429e', '#ffff00', '#e8cd54']; //some colors for flashcard

    const handleFalshCardClick = () =>{
        setIsFlipped(!isFlipped);
        setImageOnCard(!imageOnCard);
    }

    //for input
    const handleInput = (e) => {
        setInputValue(e.target.value);
    }
    const submitBtn = () =>{
        //to blink the border of input box
        if(inputValue.toLowerCase() == currentFlashcard.answer.toLowerCase() && !isFlipped){
            setCount(count +1);
        }else{
            const input = document.getElementById("myInputId");
            input.classList.remove("error-border");
            void input.offsetWidth;
            input.classList.add("error-border");
        }
    }

    const handleForwardClick = () =>{
        setCurrentCardIndex((currentCardIndex+1)%FlashcardsData.length);
        setIsFlipped(false);
        //to change the background color of the flashcard
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setBackgroundColor(randomColor);
        setImageOnCard(true);
        setInputValue("");
    }

    const handleBackwardClick = () =>{
        //to change the background color of the flashcard
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        if(currentCardIndex>0){
            setCurrentCardIndex((currentCardIndex-1)%FlashcardsData.length);
            setBackgroundColor(randomColor);
            setIsFlipped(false);
            setImageOnCard(true);
        }
        setInputValue("");
    }
    return(
        <div>
            <div className="countCorrectAnswer">
                <span>Current Streak: </span><span>{count}</span>
            </div>
            <div className="mainCard">
                <div style={{backgroundColor: backgroundColor}} className={`flashcard ${isFlipped ? "flipped":""}`} onClick={handleFalshCardClick}>
                    <div className="front">
                        <div className="content">{currentFlashcard.question}</div>
                    </div>
                    <div className="back">
                        <div className="content">{currentFlashcard.answer}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', margin: '5px' }}>
                        {(currentFlashcard.image && imageOnCard) ? ( <img src={codeSnippet} alt="could not load" width="300" height="150" /> ) : ''}
                    </div>
                </div>
            </div>
            <br/>
            <div className="input">
                <strong>Enter your guess here: </strong>
                <input type="text" id="myInputId" value={inputValue} onChange={handleInput}/>
                <button onClick={submitBtn}>Submit</button>
            </div>
            <div className="btn">
                <button onClick={handleBackwardClick}>←</button>
                <button onClick={handleForwardClick}>→</button>
            </div>
        </div>
    )
}

export default FlashCard;