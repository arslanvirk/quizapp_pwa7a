import styled, {createGlobalStyle} from 'styled-components';
import BGImage from '../images/BgQuiz.jpg';
import logo from '../images/logo.png'

export const GlobalStyle=createGlobalStyle`
html {
    height:100%;
}
body{
    background-image:url(${BGImage});
    background-size:cover;
    margin:0;
    padding: 0 20px;
    display: flex;
    justify-content:center;
}

*{
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-size: '40px';
}`;

export const Wrapper=styled.div`
    display:flex;
    flex-direction: column;
    align-items:center;

    
    select {
        margin: 5px;
        width: 190px;
        padding: 5px 35px 5px 5px;
        font-size: 16px;
        border: 1px solid #CCC;
        height: 34px;
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        background: url(${logo}) 96% / 15% no-repeat #EEE;
      }
      
    label{
        font-size:20px;
        font-weight:bold;
        margin: 10px;
    }  

    section{
        border:2px solid white;
        border-radius: 20px;
        padding: 25px;
        margin-top:50px;
    }

    .score{
        color:#fff;
        font-size:2rem;
        margin-bottom: 2px;
    }

    > p{
    color: #fff;
    }

    h1{
        font-family: Cormorant;
        background-image: linear-gradient(180deg, #fff, #87f1ff);
        background-size: 100%;
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        -moz-background-clip: text;
        -moz-text-fill-color: transport;        
        filter: drop-shadow(2px 2px #0085a3);
        font-size: 50px;
        text-align: center;
        margin: 20px;
        font-weight: 400;
    }
    
    .start, .next{
        cursor: pointer;
        background: linear-gradient(180deg,#ffffff,#cc6600);
        border:2px solid #d38558;
        border-radius: 20px;
        height: 37px;
        marign: 20px 0px;
        padding: 5px 30px;
        color:black;
        font-size: 20px;
        
    }
    .start{
        max-width: 200px;
    }
`;