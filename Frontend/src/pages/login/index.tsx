import LoginForm from '../../components/LoginForm/LoginForm';
import Header from '../../components/Header/Header';
const LoginPage =() =>{

    return(
        <>
            <Header isLogged={false}/>
            <LoginForm/>
        </>
    );
}

export default LoginPage;
