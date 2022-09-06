import SaveBook from '../../components/SaveBook/SaveBook';
import Header from '../../components/Header/Header';
const SaveBookPage =() =>{

    return(
        <>
            <Header isLogged={true}/>
            <SaveBook/>
        </>
    );
}

export default SaveBookPage;