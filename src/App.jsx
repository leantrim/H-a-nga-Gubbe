import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import randomWords from "./Services/randomWords";
import img0 from "./images/0.png";
import img1 from "./images/1.png";
import img2 from "./images/2.png";
import img3 from "./images/3.png";
import img4 from "./images/4.png";
import img5 from "./images/5.png";
import img6 from "./images/6.png";
import img7 from "./images/7.png";
import img8 from "./images/8.png";
import img9 from "./images/9.png";
import img10 from "./images/10.png";
import "./App.css";

/* BUGG LISTA! */

/* HUR SKA JAG GÖRA */

/* Ideer */
// TODO: Läsa in hela alfabetet och kolla om man kan kryssmarkera dem när man använt någon bokstav ?

/* Att göra när allt funkar */
// TODO CSS Styling.
// TODO: Snygga till koden ordentligt, DRY, kommentera allt!

function App() {
  const [wordToGuess, setWordGuess] = useState("");
  let [guessLetters, setGuessLetters] = useState([]);
  let [wordsNeededToGuess, setNeededGuests] = useState(0);
  let [maxGuesses] = useState(10);
  const [underScoreH, setUnderScoreH] = useState([]);
  const [isGenerated, setGenerated] = useState(false);

  // Function för att skapa ett object med understräck
  const createUnderscores = (wordLength) => {
    let underScore = [];
    for (let i = 0; i < wordLength; i++) {
      underScore.push(`_`);
    }
    return underScore;
  };

  const keyPress = (event) => {
    const letter = String.fromCharCode(event.keyCode);
    const tempWordsNeeded = wordsNeededToGuess;
    // Är knappen en bokstav?
    if (event.keyCode >= 65 && event.keyCode <= 90) {
      for (let i = 0; i < wordToGuess.length; i++) {
        // Matchar bokstaven med någon av bokstaven i gissningen? Är bokstaven ej gissad redan?
        if (wordToGuess[i] === letter.toLowerCase() && underScoreH[i] === "_") {
          // Ändra _ till bokstaven man gissa rätt på
          underScoreH[i] = letter.toLowerCase();
          setUnderScoreH([...underScoreH]);
          // Ett ord mindre att gissa
          wordsNeededToGuess--;
          setNeededGuests(wordsNeededToGuess);
        }
      }
      // Har användaren misslyckats med att gissa någon bokstav?
      if (tempWordsNeeded === wordsNeededToGuess) {
        let isLetterPostedInArray = false;
        // Finns redan det gissade bokstaven i försöklistan?
        for (const letterIn of guessLetters) {
          if (letterIn === letter.toLowerCase()) isLetterPostedInArray = true;
        }
        // Lägg till det misslyckade bokstaven i listan
        if (!isLetterPostedInArray) {
          guessLetters.push(letter.toLowerCase());
          setGuessLetters([...guessLetters]);
        }
      }
      // Gubben hängdes :(
      if (maxGuesses - guessLetters.length === 0) {
        toast.error(
          `You have failed, word was:${wordToGuess} ....Loading new game...`
        );
        return setTimeout(generateNewGame, 2000);
      }
      // Spelet avklarat!
      if (wordsNeededToGuess === 0) {
        toast.success("You have guessed all the words!  Loading new game...");
        return setTimeout(generateNewGame, 2000);
      }
    }
  };

  const generateNewGame = () => {
    // Generera random nummer för att få fram en array word
    const index = Math.floor(Math.random() * randomWords.length);
    // Lagra längden på arrayen
    const wordLength = randomWords[index].length;
    // Updatera hooken på det nya ordet till wordToGuess variable.
    setWordGuess(randomWords[index]);
    // Updatera hur många gissningar man behöver för att få fram ordet.
    setNeededGuests(wordLength);
    // Updatera hooken med understäcken
    setUnderScoreH([...createUnderscores(wordLength)]);
    // töm guessLetters arrayen
    setGuessLetters([]);
  };

  useEffect(() => {
    if (!isGenerated) {
      setGenerated(true);
      generateNewGame();
    }

    window.addEventListener("keydown", keyPress);
    return () => {
      window.removeEventListener("keydown", keyPress);
    };
  }, [underScoreH, wordsNeededToGuess, guessLetters, wordToGuess]);

  const loadImage = (id) => {
    console.log(id);
    switch (id) {
      case 0:
        return img0;
      case 1:
        return img10;
      case 2:
        return img9;
      case 3:
        return img8;
      case 4:
        return img7;
      case 5:
        return img6;
      case 6:
        return img5;
      case 7:
        return img4;
      case 8:
        return img3;
      case 9:
        return img2;
      case 10:
        return img1;
      default:
    }
    // VARFÖR FUNKAR INTE DETTA ?!!?!
    // return `./images/${id}.png`;
  };

  return (
    <>
      <ToastContainer />
      <div className="container">
        <div className="child">
          <h1>Hänga Shunon By Lean</h1>
          <img src={loadImage(maxGuesses - guessLetters.length)} />
          <div className="text">
            <h1>{underScoreH.map((x) => x + " ")}</h1>
            <h4>{guessLetters.map((f) => f + " ")}</h4>
            <p>Försök kvar: {maxGuesses - guessLetters.length}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
