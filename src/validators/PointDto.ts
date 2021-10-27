import * as yup from 'yup';

class PointDto {
  createUpdateValidation() {
    const schema = yup.object().shape({
      name: yup.string().required('Nome é obrigatório'),
      description: yup.string().required('Descrição é obrigatória'),
      floor: yup.number().required('O Andar é obrigatório'),
      altitude: yup.number().required('A Altitude é obrigatória'),
      latitude: yup.number().required('A Latitude é obrigatória'),
      longitude: yup.number().required('A Longitude é obrigatória'),
      isObstacle: yup.boolean().required('O obstáculo é obrigatório'),
      map_id: yup
        .string()
        .uuid('Id de mapa deve ser do tipo uuid')
        .required('Id de mapa é obrigatório'),
    });
    return schema;
  }
}

export { PointDto };
