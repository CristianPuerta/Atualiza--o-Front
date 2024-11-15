import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Container, LeftContainer, RightContainer, Title, Form, InputContainer } from "./styles"
import Logo from '../../assets/Logo1.svg'
import { Button } from "../../components/Button"
import { api } from '../../services/api';
import { toast } from 'react-toastify';

export function Register() {


    const schema = yup
        .object({
            name: yup.string().required('O nome é obrigatorio'),
            email: yup.string().email('Digite um e-mail válido').required('O  e-mail é obrigatório'),
            password: yup.string().min(6, 'A senha deve ter pelo menos 6 caracteres').required('Digite uma senha válida'),
            confirmPassword: yup
                .string()
                .oneOf([yup.ref('password')], 'As senhas devem ser iguais.').required('Confirme sua senha'),
        })
        .required();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const onSubmit = async data => {
        const response = await toast.promise(
            api.post('/users', {
                name: data.name,
                email: data.email,
            }),
            {
                pending: 'Verificando seus dados',
                success: 'Cadastro efetuado com Sucesso',
                error: 'Ops, algo deu errado! Tente novamente.',
            }
        )

        console.log(response)
    }

    return (
        <Container>
            <LeftContainer>
                <img src={Logo} alt='logo-devburger'></img>
            </LeftContainer>
            <RightContainer>
                <Title>Criar conta</Title>
                <Form onSubmit={handleSubmit(onSubmit)}>

                    <InputContainer>
                        <label>Nome:</label>
                        <input type="text" {...register('name')} />
                        <p>{errors?.name?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Email:</label>
                        <input type="email" {...register('email')} />
                        <p>{errors?.email?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Senha:</label>
                        <input type="password" {...register('password')} />
                        <p>{errors?.password?.message}</p>
                    </InputContainer>

                    <InputContainer>
                        <label>Confirmar Senha:</label>
                        <input type="password" {...register('confirmPassword')} />
                        <p>{errors?.confirmPassword?.message}</p>
                    </InputContainer>

                    <Button type="submit">Criar conta</Button>
                </Form>
                <p>Já possui conta? <a>Clique aqui.</a></p>
            </RightContainer>
        </Container>
    )
}