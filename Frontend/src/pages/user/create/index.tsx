import SignUpForm from '../../../components/SignUpForm/SignUpForm';
import Header from '../../../components/Header/Header';
const SignUpPage = () =>{

    return(
        <>
            <Header isLogged={false}/>
            <SignUpForm/>
        </>
    );
}

export default SignUpPage;