import * as yup from 'yup';

class AuthDto {
    public authValidation() {
        return yup.object().shape({
            email: yup.string().email('E-mail incorreto').required('E-mail é obrigatório'),
            password: yup.string().required('Senha é obrigatória'),
        });
    }
}

export { AuthDto }