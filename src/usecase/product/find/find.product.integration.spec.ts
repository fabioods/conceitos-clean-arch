import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from '../../../infra/product/repository/sequelize/model/productModel'
import { ProductSequelizeRepository } from '../../../infra/product/repository/sequelize/productSequelizeRepository'
import { FindProductUseCase } from './find.product.usecase'
import { ProductFactory } from '../../../domain/product/factory/productFactory'

describe('Test Find Product use case with integration', () => {
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

  it('should find product by id', async () => {
    const productRepository = new ProductSequelizeRepository()
    const useCase = new FindProductUseCase(productRepository)

    const product = ProductFactory.create('normal', 'Product 1', 10)

    await productRepository.create(product)

    const result = await useCase.execute({
      id: product.id
    })

    const output = {
      id: product.id,
      name: 'Product 1',
      price: 10
    }

    expect(result).toEqual(output)
  })
})
