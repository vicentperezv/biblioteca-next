import { useFormik } from 'formik';
import { Container, Title } from './SignUpFormStyles';
import Router from "next/router";
import api from '../../service/api';

import { Label, Input, Button, Form  } from '../../styles/GlobalComponents';


const SignUpForm = () =>{
    
    const formik = useFormik({
        initialValues: {
            name:'',
            email: '',
            password: '',
        },
        onSubmit: async (values) => {
            const response = await api.post('/user/create', values);
            if(response.data.result){                               
                      Router.push("/")           
            }
        }
    })

    return(
        <Container>
            <Title>Crear Cuenta</Title>
            <Form onSubmit={formik.handleSubmit}>
                <Label>Nombre</Label>
                <Input
                    name="name"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
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

export default SignUpForm;