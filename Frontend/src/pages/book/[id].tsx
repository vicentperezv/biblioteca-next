import BookInfo from '../../components/BookInfo/BookInfo';
import api from '../../service/api';
import Header from '../../components/Header/Header';
import useSWR from 'swr'

const BookPage = ({Book}) => {
    const fetcher = () => api.get('/user/profile')
    const { data } = useSWR('/api/data', fetcher)
    const email = data
    return (
        <>  
            
            <Header isLogged={true}/>
            <BookInfo Book={Book} email={email}/>

        </>
    )
}

export default BookPage;

export const getServerSideProps = async ({ params }) => { 
    
    
    const id = params.id;  
    const response = await api.get(`/books/byid/${id}`);
    

    const data = response.data;
    
    return {
        props: { 
            Book: data.book,            
        }
    }
}
