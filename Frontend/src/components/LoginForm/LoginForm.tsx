import { useFormik } from 'formik';
import { Container, Title } from './LoginFormStyle';

import Router from "next/router";
import { Label, Input, Button, Form  } from '../../styles/GlobalComponents';

import api from '../../service/api';
const LoginForm = () =>{
    
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            const response = await api.post('/user/login', values);
            if(response.data.result){                                   
                      Router.push('/');            
            }
        }
    })

    return(
        <Container>
            <Title>Login</Title>
            <Form onSubmit={formik.handleSubmit}>

                <Label>Email</Label>
                <Input
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                <Label>Password</Label>
                <Input
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                />
                <Button type="submit">Ingresar</Button>
            </Form>
        </Container>
    );

};

export default LoginForm;