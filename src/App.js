import React, { useState, useEffect } from 'react';
import './App.css';

const localQuotes = [{
  quote: "If we lose all of our wealth and are only left with love then, indeed, we shall never be poor.",
  author: "Stephen Richards ",
  tags: ["metaphysics", "life"]
}, {
  quote: "You are an aperture through which the universe is looking at and exploring itself.",
  author: "Alan W. Watts ",
  tags: ["metaphysics", "life"]
}, {
  quote: "Perceive that which cannot be seen with the eye.",
  author: "Miyamoto Musashi ",
  tags: ["metaphysics", "life"],
  citation: "A Book of Five Rings",
  year: " 1642"
}, {
  quote: "Some people without brains do an awful lot of talking, don't you think?",
  author: "L. Frank Baum ",
  tags: ["knowledge", "speech "],
  citation: "The Wonderful Wizard of Oz",
  year: " 1900"
}, {
  quote: "The saddest aspect of life right now is that science gathers knowledge faster than society gathers wisdom.",
  author: "Isaac Asimov ",
  tags: ["life", "science", "knowledge", "wisdom"]

}, {
  quote: "Anyone who has never made a mistake has never tried anything new.",
  author: "Albert Einstein ",
  tags: ["weapons", "war"]

}, {
  quote: "Do not look upon this world with fear and loathing. Bravely face whatever the gods offer.",
  author: "Morihei Ueshiba ",
  tags: ["martial arts", "training", "peace"]

}, {
  quote: "If you love life, don't waste time, for time is what life is made up of.",
  author: "Bruce Lee ",
  tags: ["life", "time"]
}, {
  quote: "Both the man of science and the man of action live always at the edge of mystery, surrounded by it.",
  author: "J. Robert Oppenheimer ",
  tags: ["science", "philosophy"]

}, {
  quote: "Magic is the sole science not accepted by scientists, because they can't understand it.",
  author: "Houdini ",
  tags: ["science", "magic"]

}, {
  quote: "What we observe is not nature itself, but nature exposed to our method of questioning.",
  author: "Werner Heisenberg ",
  tags: ["nature", "observation", "science"]

}, {
  quote: "To seize control over the laws of Mother Nature one must attain self-mastery.",
  author: "Yehuda Berg ",
  citation: "The 72 Names of God: Technology for the Soul",
  year: " 2004"


}, {
  quote: "To hold a people in oppression you have to convince them first that they are supposed to be oppressed.",
  author: "John Henrik Clarke",
  tags: ["oppression", "perception"]
}, {
  quote:"You can do anything but not everything",
  author:"David Allen",
  citation:"Making it all work",
  year:" 2009",
  tags: ["time","life","skill"]
}];

; // Your local array of quotes
const targetURL = "https://talaikis.com/api/quotes/random/";

function getRandomColor() {
  const colors = ['#FF5733', '#33FF68', '#337CFF', '#FF33F3', '#FFD933'];
  return colors[Math.floor(Math.random() * colors.length)];
}

function App() {
  const [currentQuote, setCurrentQuote] = useState({});
  const [backgroundColor, setBackgroundColor] = useState(getRandomColor());
  const [quotesFromAPI, setQuotesFromAPI] = useState([]);
  const [usedQuotes, setUsedQuotes] = useState([]);

  useEffect(() => {
    if (quotesFromAPI.length === 0) {
      fetch(targetURL)
        .then(response => response.json())
        .then(data => setQuotesFromAPI(data));
    }
  }, [quotesFromAPI]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (localQuotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * localQuotes.length);
        setCurrentQuote(localQuotes[randomIndex]);
        setUsedQuotes([...usedQuotes, localQuotes[randomIndex]]);
        localQuotes.splice(randomIndex, 1);
      } else if (quotesFromAPI.length > 0) {
        setCurrentQuote(quotesFromAPI.pop());
      } else {
        clearInterval(interval);
      }
      setBackgroundColor(getRandomColor());
    }, 30000);

    return () => clearInterval(interval);
  }, [usedQuotes, quotesFromAPI]);

  return (
    <div className="App" style={{ backgroundColor }}>
      <div className="quote-container">
        <div className="quote-text">{currentQuote.quote}</div>
        <div className="quote-author">- {currentQuote.author}</div>
      </div>
    </div>
  );
}

export default App;


