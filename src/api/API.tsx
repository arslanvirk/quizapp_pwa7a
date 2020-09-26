export const shuffleArray=(array:any[])=>[...array].sort(()=>Math.random()-0.5);

export type Question = {
    category:string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
}

export type QuestionState=Question & {answers: string[]};//added property in Questions

export enum Difficulty{
    EASY="easy",
    MEDIUM="medium",
    HARD="hard",
}

export const fetchQuizQuestions=async(amount: number, difficulty:Difficulty,type:number)=>{
    const endpoint=`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&category=${type}&type=multiple`;
    console.log(endpoint);
    
    const data = await(await fetch(endpoint)).json();
    return data.results.map((question:Question)=>(
        {
            ...question,
            answers:shuffleArray([...question.incorrect_answers,question.correct_answer]),
        }
    ));
}
