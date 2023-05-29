import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from '../../../infra/product/repository/sequelize/model/productModel'
import { ProductSequelizeRepository } from '../../../infra/product/repository/sequelize/productSequelizeRepository'
import { UpdateProductUseCase } from './update.product.usecase'
import { ProductFactory } from '../../../domain/product/factory/productFactory'

describe('Update product with integration test', () => {
  let sequelize: Sequelize
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([ProductModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should update product by id', async () => {
    const productRepository = new ProductSequelizeRepository()
    const useCase = new UpdateProductUseCase(productRepository)

    const product = ProductFactory.create('normal', 'Product 1', 10)

    await productRepository.create(product)

    const result = await useCase.execute({
      id: product.id,
      price: 20,
      name: 'Product 2'
    })

    const output = {
      id: product.id,
      name: 'Product 2',
      price: 20
    }

    expect(result).toEqual(output)
  })
})
