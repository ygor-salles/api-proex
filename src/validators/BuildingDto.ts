import * as yup from 'yup';

class BuildingDto {
    public createUpdateValidation() {
        const schema = yup.object().shape({
            name: yup.string().required('Nome é obrigatório'),
            latitude: yup.number().required('Latitude é obrigatória'),
            longitude: yup.number().required('Longitude é obrigatória'),
            description: yup.string().required('Descrição é obrigatória'),
            organization_id: yup.string().required('Id da Organização é obrigatória')
        });

        return schema
    }
}

export { BuildingDto }