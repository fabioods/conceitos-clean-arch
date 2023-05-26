import { ProductRepositoryInterface } from '../../../domain/product/repository/productRepositoryInterface'
import { InputListProductDto, OutputListProductDto } from './list.product.dto'

export class ListProductUseCase {
  constructor (private readonly productRepository: ProductRepositoryInterface) {}

  async execute (input: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll()
    return {
      products: products.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price
      }))
    }
  }
}
