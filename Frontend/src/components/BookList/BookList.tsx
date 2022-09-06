import BookCard from "../BookCard/BookCard";
import { GridContainer } from "./BookListStyle";


const BookList = (props) =>{
    
    const { Books } = props;
     
    return (
        <GridContainer>
            {Books.map( Book => <BookCard key={Book.id}>{Book}</BookCard>)}
        </GridContainer>
    );
};

export default BookList;