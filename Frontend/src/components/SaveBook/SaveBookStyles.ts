import styled from "styled-components";


export const Container = styled.div`
    margin-top: 7.5rem;
    margin-right: 20%;
    margin-left: 20%;
    @media ${(prop) => prop.theme.breakpoints.sm}{
        margin-top: 2rem;
        margin-right: 5%;
        margin-left: 5%;
    }
`;

export const Title = styled.h2`
    color:#5a5a5a;
    margin-bottom:1rem;
`;