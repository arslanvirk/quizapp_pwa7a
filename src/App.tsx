import React, { useState } from 'react';
import QuestionCard from './components/QuestionCard';
import { fetchQuizQuestions, QuestionState, Difficulty } from './api/API';
import { GlobalStyle, Wrapper } from './styles/App.styles';
import firebase from './firebase';

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

let TOTAL_QUESTIONS = 10;

const App = () => {

  const [firebaseTokenStatus, setfirebaseTokenStatus] = useState(false);
  const messaging = firebase.messaging();
  if (firebaseTokenStatus === false) {
    messaging.requestPermission().then(() => {
      return messaging.getToken()
    }).then((token) => {
      setfirebaseTokenStatus(true);
      //prompt('token',token);
      console.log('token', token);
    }).catch((exc) => {
      console.log('Exception', exc);
    })
  }

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [Type, setType] = useState(9);
  const [DifficultyLevel, setDifficultyLevel] = useState<Difficulty>(Difficulty.EASY);
  const [mode, setMode] = useState('online');

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    let newQuestions: any;
    await fetchQuizQuestions(TOTAL_QUESTIONS, DifficultyLevel, Type).then((result) => {
      setMode('online');
      //console.log(result);
      newQuestions = result;
      localStorage.setItem("qlist", JSON.stringify(result));
    }).catch(err => {
      setMode('offline');
      //console.log("internet not connected");
      const qdata = localStorage.getItem("qlist");
      //const qlist=collection?.length>0?collection:"";
      const qlist = qdata === null ? "" : qdata;
      newQuestions = JSON.parse(qlist);
    })

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      //Users answer
      const answer = e.currentTarget.value;
      //check answer angainst correct answer
      const correct = questions[number].correct_answer === answer;
      //Add score if answer is correct
      if (correct) setScore(prev => prev + 1)
      //save answer in the array for user answers
      const AnswerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(prev => [...prev, AnswerObject])
    }
  }

  const nextQuestion = () => {
    //Move to next question if not last
    const nextQuestion = number + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    }
    else {
      setNumber(nextQuestion);
    }
  }

  const selectType = (e: any) => {
    setType(e.target.value);
  }

  const selectDifficulty = (e: any) => {
    switch (e.target.value) {
      case "1":
        setDifficultyLevel(Difficulty.EASY);
        break;
      case "2":
        setDifficultyLevel(Difficulty.MEDIUM);
        break;
      case "3":
        setDifficultyLevel(Difficulty.HARD);
        break;
    }
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>Quiz App</h1>
        {
          mode === 'offline' ? <label>Your are in offline mode</label> : null
        }
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <section>
            {console.log("Mode", mode)}
            {mode === 'online' ?
              <>
                <label style={{color:"#c3bfc0"}}>Category:</label>
                <select onChange={selectType}>
                  <option value="9">General Knowledge</option>
                  <option value="15">Video Games</option>
                  <option value="17">Science & Nature</option>
                  <option value="18">Computers</option>
                  <option value="21">Sports</option>
                  <option value="28">Vehicles</option>
                </select>
                <br />
                <label style={{color:"#c3bfc0"}}>Difficulty:</label>
                <select onChange={selectDifficulty}>
                  <option value="1">Easy</option>
                  <option value="2">Medium</option>
                  <option value="3">Hard</option>
                </select>
              </> : null}
            <hr />
            <button className="start" onClick={startTrivia}>Start Quiz</button>
          </section>
        ) : null}

        {!gameOver ? <p className="score">Score: {score}</p> : null}
        {loading ? <p>Loading Questions...</p> : null}
        {!loading && !gameOver && (
          <QuestionCard
            questionNo={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answers}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
        )}
        {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
          <button className="next" onClick={nextQuestion}>Next Question</button>
        ) : null}
      </Wrapper>
    </>
  );
}

export default App;
