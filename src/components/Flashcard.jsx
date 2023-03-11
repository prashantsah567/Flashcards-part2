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
    const [isFlipped, setIsFlipped] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState('#ed7d45');
    const [currentCardIndex, setCurrentCardIndex] = useState(0);
    const currentFlashcard = flashcardsData[currentCardIndex];
    const [imageOnCard, setImageOnCard] = useState(true);

    const colors = ['#42b6f5', '#7542f5', '#f5429e', '#ffff00', '#e8cd54'];

    const handleClick = () =>{
        setIsFlipped(!isFlipped);
        setImageOnCard(!imageOnCard);
    }

    const handleForwardClick = () =>{
        setCurrentCardIndex((currentCardIndex+1)%flashcardsData.length);
        setIsFlipped(false);
        //to change the background color of the flashcard
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        setBackgroundColor(randomColor);
        setImageOnCard(true);
    }
    return(
        <div>
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
            <div className="btn">
                <button onClick={handleForwardClick}>→</button>
            </div>
        </div>
    )
}

export default FlashCard;