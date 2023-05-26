import { Product } from '../../../../domain/product/entity/product'
import { ProductInterface } from '../../../../domain/product/entity/productInterface'
import { ProductRepositoryInterface } from '../../../../domain/product/repository/productRepositoryInterface'
import { ProductModel } from './model/productModel'

export class ProductSequelizeRepository implements ProductRepositoryInterface {
  async find (id: string): Promise<Product> {
    const product = await ProductModel.findByPk(id)
    if (!product) {
      throw new Error('Product not found')
    }
    return new Product(product.id, product.name, product.price)
  }

  async create (entity: ProductInterface): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price
    })
  }

  async update (entity: ProductInterface): Promise<void> {
    await ProductModel.update(
      { name: entity.name, price: entity.price },
      { where: { id: entity.id } }
    )
  }

  async findAll (): Promise<ProductInterface[]> {
    const products = await ProductModel.findAll()
    return products.map(
      (product) => new Product(product.id, product.name, product.price)
    )
  }
}
