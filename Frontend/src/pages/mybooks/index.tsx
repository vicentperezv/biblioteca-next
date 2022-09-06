import BookList from '../../components/BookList/BookList'
import api from '../../service/api';
import Header from '../../components/Header/Header';
export default function MyBooks({Books}) {

  if(!Books){
    return (
      <Header isLogged={true}/>
    );
  }
  return (
    <>
      <Header isLogged={true}/>
      <BookList key={'Catalog'} Books={Books}/>
    </>
    )
}

export const getServerSideProps = async ({ req }) => { 
    
  
  const response = await api.get('/books/myBooks',{
    headers: {
    Cookie: req.headers.cookie || '',
  }});
  
  const data = response.data
  
  return {
    props: { Books: data.books }
  }
}