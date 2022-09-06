import { Container, Img, Title, Id, Author, Category, Publisher, Isbn, Right, Left } from './BookInfoStyles'
import { Button } from '../../styles/GlobalComponents';
import Router from "next/router";

import api from '../../service/api';




const BookInfo = (props) =>{
    
    const { Book, email } = props;
    const bookCover = Book.cover != null 
                         ? 'http://localhost:3700/api/books/get-cover/' +Book.cover
                         : '/no-img.png';
    
    let button = null;
    
    if(email){
        const userEmail = email.data.email
        button = Book.borrowed && Book.borrowedTo == userEmail 
             ? <Button onClick={ () => {
                                        api.get(`/books/takeBack/${Book._id}`)
                                        Router.push('/mybooks'); 
                                    }}>Regresar</Button>
             : !Book.borrowed ?  <Button onClick={ () => {
                                                            api.get(`/books/takeABook/${Book._id}`)
                                                            Router.push('/mybooks'); 
                                                        }}>Tomar</Button>
                              : null
    }
    return(
        <Container>
            <Left>
                <Img src={bookCover}/>
            </Left>
            <Right>
                <Title>{Book.title}</Title>
                <Author>{Book.author}</Author>
                <Category>categoria: {Book.category}</Category>
                <Publisher> publisher: {Book.publisher}</Publisher>
                <Isbn>isbn: {Book.isbn}</Isbn>
                {button}
            </Right>
        </Container>
    );
}

export default BookInfo