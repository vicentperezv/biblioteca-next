import styled from "styled-components";


export const Label = styled.label`
    display: block;
    color:#888;


`;

export const Input = styled.input`
    display: block;
    margin-top:1rem;
    margin-bottom:1rem;
    padding: 0.375rem 0.75rem;
    font-weight: 400;
    line-height: 1.5;
    color: #5a5a5a;
    width: 100%;
    border:1px solid #ced4da;
    border-radius:  0.4rem;
    &:focus{
        border-color: #d0eae2;
        outline: 0;
    }

`;

export const Button = styled.button`
    
    background-color:#78C2AD;
    border: none;
    color: hsl(204,23.8%,95.9%);
    border-radius: 0.4rem;
    cursor: pointer;
    font-size: 2rem;
    padding: 0.375rem 0.75rem;
    font-weight: 400;
`;

export const SecundaryButton = styled.button`
    
    background-color:#78C2AD;
    border: none;
    color: hsl(204,23.8%,95.9%);
    border-radius: 0.4rem;
    cursor: pointer;
    font-size: 2rem;
    padding: 0.375rem 0.75rem;
    font-weight: 400;
`;

export const Form = styled.form`
    width: 400px;
`;
