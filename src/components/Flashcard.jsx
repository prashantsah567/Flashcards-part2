import React, {useState} from "react";
import "./FlashCard.css";
import codeSnippet from '../assets/codeSnippet.png';

const flashcardsData = [
    {question: "What does DOM stands for?", answer: "Document Object Model"},
    {question: "What is a closure?", answer: "It's an inner function that has access to the outer function's variables and parameters"},
    {question: "What will be logged to the console when this code is run?", answer: "[2, 4, 6, 8, 10]", image: "codeSnippet.png"},
    {question: "What is the virtual DOM in React?", answer: "It's a lightweight representation of the actual DOM used by React for performance optimization"},
    {question: "What is purpose of the 'useEffect' hook in React?", answer: "It is used to perform side effects in a React functional component, such as fetching data or updating the DOM"},
    {question: "What is the difference between 'let' and 'const' in JS?", answer: "'Let' declares a variable that can be reassigned, while 'const' declares a variable that cannot be reassigned"},
    {question: "What is the purpose of the 'map' function in JS?", answer: "It is used to iterate over an array and transform its element into a new array"},
    {question: "What is the difference between 'null' and 'undefined'?", answer: "'null' represents the intentional absence of any object value, while 'undefined' represents the absence of a value"},
    {question: "What is the purpose of 'reduce' function in JS?", answer: "It is used to iterate over an array and accumlate its value into a single value"},
    {question: "What is the purpose fo the 'this' keyword in JS?", answer: "The 'this' keyword refers to the object that the function is a method of, or the global if the function is not a method of any object"},
];

const FlashCard = () => {
    const [isFlipped, setIsFlipped] = useState(false); //when card is flipped
    const [backgroundColor, setBackgroundColor] = useState('#ed7d45'); //background color for flashcard
    const [currentCardIndex, setCurrentCardIndex] = useState(0); //value of current card index
    const currentFlashcard = flashcardsData[currentCardIndex]; //current flashcard
    const [imageOnCard, setImageOnCard] = useState(true); //for the image on flashcard
    const [inputValue, setInputValue] = useState(""); //for input
    const [count,setCount] = useState(0);
    const colors = ['#42b6f5', '#7542f5', '#f5429e', '#ffff00', '#e8cd54']; //some colors for flashcard

    const handleClick = () =>{
        setIsFlipped(!isFlipped);
        setImageOnCard(!imageOnCard);
    }

    //for input
    const handleInput = (e) => {
        setInputValue(e.target.value);
    }
    const checkAnswerBtn = () =>{
        if(inputValue.toLowerCase() == currentFlashcard.answer.toLowerCase()){
            setCount(count +1);
        }
    }

    const handleForwardClick = () =>{
        setCurrentCardIndex((currentCardIndex+1)%flashcardsData.length);
        setIsFlipped(false);
        //to change the background color of the flashcard
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setBackgroundColor(randomColor);
        setImageOnCard(true);
    }

    const handleBackwardClick = () =>{
        //to change the background color of the flashcard
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        if(currentCardIndex>0){
            setCurrentCardIndex((currentCardIndex-1)%flashcardsData.length);
            setBackgroundColor(randomColor);
            setIsFlipped(false);
            setImageOnCard(true);
        }
    }
    return(
        <div>
            <div className="countCorrectAnswer">
                <span>Current Streak: </span><span>{count}</span>
            </div>
            <div className="mainCard">
                <div style={{backgroundColor: backgroundColor}} className={`flashcard ${isFlipped ? "flipped":""}`} onClick={handleClick}>
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
                <input type="text" name="guess" value={inputValue} onChange={handleInput}/>
                <button onClick={checkAnswerBtn}>Submit</button>
            </div>
            <div className="btn">
                <button onClick={handleBackwardClick}>←</button>
                <button onClick={handleForwardClick}>→</button>
            </div>
        </div>
    )
}

export default FlashCard;