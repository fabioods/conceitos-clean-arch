import { ProductFactory } from '../../../domain/product/factory/productFactory'
import { ProductRepositoryInterface } from '../../../domain/product/repository/productRepositoryInterface'
import { InputCreateProdutctDTO, OutputCreateProdutctDTO } from './create.produtct.dto'

export class CreateProductUseCase {
  constructor (private readonly repository: ProductRepositoryInterface) {}

  async execute (input: InputCreateProdutctDTO): Promise<OutputCreateProdutctDTO> {
    const product = ProductFactory.create('normal', input.name, input.price)
    await this.repository.create(product)
    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
