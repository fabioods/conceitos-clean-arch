import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from '../../../infra/product/repository/sequelize/model/productModel'
import { ProductSequelizeRepository } from '../../../infra/product/repository/sequelize/productSequelizeRepository'
import { CreateProductUseCase } from './create.product.usecase'
import { ProductFactory } from '../../../domain/product/factory/productFactory'

describe('Test Create Product use case with integration', () => {
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

  it('should create product', async () => {
    const productRepository = new ProductSequelizeRepository()
    const useCase = new CreateProductUseCase(productRepository)

    const result = await useCase.execute({
      name: 'Product 1',
      price: 10
    })

    const output = {
      id: result.id,
      name: 'Product 1',
      price: 10
    }

    expect(result).toEqual(output)
  })
})
