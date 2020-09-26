import styled from 'styled-components';

export const Wrapper=styled.div`
    marx-width: 1100px;
    background:#ecd9c6;
    opacity:0.93;
    padding: 20px;
    color:black;
    text-align:center;
    border-radius:20px;
    p{
        font-size: 1.5rem;
    }
`

type ButtonWrapperProp={
    correct:boolean;
    userClicked: boolean;
}

export const ButtonWrapper= styled.div<ButtonWrapperProp>`
    transition: all 0.4s ease-in;
    :hover{
        opacity:0.7;
    }
    button{
        font-size:1.2rem;
        width: 80%;
        height:40px;
        cursor: pointer;
        user-select:none;
        margin:6px 1px;
        background:${({correct, userClicked})=>
         correct?'linear-gradient(90deg, #66cc66,#53c653);color:white':!correct && userClicked
         ? 'linear-gradient(90deg,#ff5656,#ff4d4d);color:white': 'linear-gradient(90deg,#66ccff,#99ddff);color:black'};
        border:4px solid white;
        border-radius: 30px;
    }
`;