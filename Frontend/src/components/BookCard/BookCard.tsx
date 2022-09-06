import Link from 'next/link'
import { Card, Cover, Title, Author } from './BookCardStyle'
import axios from 'axios';

const BookCard =  (props) =>{
    const { children } = props;
    
    return(
        <Link href={'/book/' + children._id}>
            <Card>
                <Cover src= {'http://localhost:3700/api/books/get-cover/' + children.cover} />
                <Title>{children.title}</Title>
                <Author>{children.author}</Author>
            </Card>
        </Link>
    );
}

export default BookCard;


