
import BookList from '../components/BookList/BookList'
import api from '../service/api';
import Header from '../components/Header/Header'


export default function Home({Books}) {
  
  return (
    <>
      <Header isLogged={true}/>
      <BookList key={'Catalog'} Books={Books}/>
    </>
    )
  }  

  
  export const getServerSideProps = async ({ query }) => { 
    
  
  const response = await api.get('/books/available');
  const data = response.data
  return {
    props: { Books: data.books }
  }
}