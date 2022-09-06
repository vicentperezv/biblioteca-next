import { Container, Div1, Div2, Div3, Logo, NavLink } from './HeaderStyle'; 
import {  Button } from '../../styles/GlobalComponents';
import api from '../../service/api';
import Router from "next/router";

import Link from 'next/link';
const Header = (props) =>{
    
    const {isLogged} = props;

    if(!isLogged){
        return (
            <HeaderNotLoggedIn/>
        );
    }
    
    return (
        <HeaderLoggedIn/>
    );
        
    
};

const HeaderNotLoggedIn = () =>{
    return(
        <Container>
            <Title/>
            
            <Div3>
                <li>
                    <Link href={'/login'}>
                        <NavLink>Log in</NavLink>
                    </Link>
                </li>                
                <li>
                    <Link href={'/user/create'}>
                        <NavLink>Crear cuenta</NavLink>
                    </Link>
                </li>
           </Div3>
        </Container>
    );
    
};

const  logout = async () => {
    await api.get('/user/logout');
    Router.push('/login');  
}
 
const HeaderLoggedIn = () =>{
    return (
        <Container>
            <Title/>
            <Div2>
                <li>
                    <Link href={'/'}>
                        <NavLink>Catalogo</NavLink>
                    </Link>
                </li>
                <li>
                    <Link href={'/mybooks'}>
                        <NavLink>Mis Libros</NavLink>
                    </Link>
                </li>
                <li>
                    <Link href={'/save'}>
                        <NavLink>Guardar Libro</NavLink>
                    </Link>
                </li>
            </Div2>
            <Div3>                
                <li>
                    <Button onClick={() => logout()}>Salir</Button>
                </li>
           </Div3>
        </Container>
    );
};

const Title = () =>{
    return (
        <Div1>
            <Link href={'/'}>
                <Logo>Biblioteca</Logo>
            </Link>
        </Div1>
    );
};
export default Header;