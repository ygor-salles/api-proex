import * as yup from 'yup';

class ChangeDto {
    public changeValidation() {
        return yup.object().shape({
            email: yup.string().email('E-mail incorreto').required('E-mail é obrigatório'),
            password: yup.string().required('Senha é obrigatória'),
            codVerificacao: yup.string().required('Código de verificação é obrigatório')
        })
    }
}

export { ChangeDto }