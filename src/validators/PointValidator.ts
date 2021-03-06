import * as yup from 'yup';

class PointValidator {
  createValidation() {
    return yup.object().shape({
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
  }

  updateValidation() {
    return yup.object().shape({
      id: yup
        .string()
        .uuid('Id de ponto deve ser do tipo uuid')
        .required('Id de ponto é obrigatório no parametro da requisição'),
      name: yup.string().optional(),
      description: yup.string().optional(),
      floor: yup.number().optional(),
      altitude: yup.number().optional(),
      latitude: yup.number().optional(),
      longitude: yup.number().optional(),
      isObstacle: yup.boolean().optional(),
      map_id: yup.string().uuid('Id de mapa deve ser do tipo uuid').optional(),
    });
  }

  deleteByIdValidation() {
    return yup.object().shape({
      id: yup
        .string()
        .uuid('Id de ponto deve ser do tipo uuid')
        .required('Id de ponto é obrigatório no parametro da requisição'),
    });
  }

  readByIdValidation() {
    return yup.object().shape({
      id: yup
        .string()
        .uuid('Id de ponto deve ser do tipo uuid')
        .required('Id de ponto é obrigatório no parametro da requisição'),
    });
  }
}

export { PointValidator };
