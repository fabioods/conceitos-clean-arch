import { ValidatorInterface } from '../../shared/validator/validator.interface'
import { Product } from '../entity/product'
import * as yup from 'yup'

export class ProductYupValidator implements ValidatorInterface<Product> {
  validate (entity: Product): void {
    try {
      yup.object().shape({
        id: yup.string().required('ID is required'),
        name: yup.string().required('Name is required'),
        price: yup.number().moreThan(0, 'Price is invalid').required('Price is required')
      }).validateSync({
        id: entity.id,
        name: entity.name,
        price: entity.price
      }, {
        abortEarly: false
      })
    } catch (error) {
      const e = error as yup.ValidationError
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: 'product',
          message: error
        })
      })
    }
  }
}
