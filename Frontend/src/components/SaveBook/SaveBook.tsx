import { useFormik } from 'formik';
import { Container, Title } from './SaveBookStyles';
import { Label, Input, Button, Form  } from '../../styles/GlobalComponents';
import api from '../../service/api';
import FormData  from 'form-data'

const SaveBook = () =>{
    
    const formik = useFormik({
        initialValues: {
            title:'',
            author: '',
            category: '',
            publisher:'',
            isbn: '',
            image: undefined
            
        },
        onSubmit: async (values) => {
            const response = await api.post('/books/save', values);
            if(response.data){
                console.log(values.image);
                const formData = new FormData();
                formData.append('image', values.image[0])
                await api.post(`/books/uploadCover/${response.data.book._id}`, formData)
            }
        }
    })

    return(
        <Container>
            <Title>Guardar Libro</Title>
            <Form onSubmit={formik.handleSubmit}>
                <Label>Nombre</Label>
                <Input
                    name="title"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.title}
                />
                <Label>Autor</Label>
                <Input
                    name="author"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.author}
                />
                <Label>Categoria</Label>
                <Input
                    name="category"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.category}
                />
                
                <Label>Publicador</Label>
                <Input
                    name="publisher"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.publisher}
                />
                <Label>ISBN</Label>
                <Input
                    name="isbn"
                    type="text"
                    onChange={formik.handleChange}
                    value={formik.values.isbn}
                />
                <Label>Portada</Label>
                <Input
                    type="file"
                    accept="image/png, image/jpeg"
                    onChange={(event) => formik.setFieldValue('image',event.currentTarget.files)}                    
                />
                <Button type="submit">Guardar</Button>
            </Form>
        </Container>
    );

};

export default SaveBook;