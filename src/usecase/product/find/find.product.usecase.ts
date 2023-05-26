import { ProductRepositoryInterface } from '../../../domain/product/repository/productRepositoryInterface'
import { InputFindProductDTO, OutputFindProductDTO } from './find.product.dto'

export class FindProductUseCase {
  constructor (private readonly repository: ProductRepositoryInterface) {}

  async execute (input: InputFindProductDTO): Promise<OutputFindProductDTO> {
    const product = await this.repository.find(input.id)
    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
