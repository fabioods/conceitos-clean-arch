import { ProductRepositoryInterface } from '../../../domain/product/repository/productRepositoryInterface'

import { InputUpdateProductDto, OutputUpdateProductDto } from './update.product.dto'

export class UpdateProductUseCase {
  constructor (private readonly repository: ProductRepositoryInterface) {}

  async execute (input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.repository.find(input.id)
    product.changePrice(input.price)
    await this.repository.update(product)
    return {
      id: product.id,
      name: product.name,
      price: product.price
    }
  }
}
