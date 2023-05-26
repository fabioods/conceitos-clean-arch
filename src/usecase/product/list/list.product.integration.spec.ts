import { Sequelize } from 'sequelize-typescript'
import { ProductModel } from '../../../infra/product/repository/sequelize/model/productModel'
import { ProductFactory } from '../../../domain/product/factory/productFactory'
import { ProductSequelizeRepository } from '../../../infra/product/repository/sequelize/productSequelizeRepository'
import { ListProductUseCase } from './list.product.usecase'

describe('List product integration test', () => {
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

  it('should list products', async () => {
    const productRepository = new ProductSequelizeRepository()
    const useCase = new ListProductUseCase(productRepository)

    const productA = ProductFactory.create('normal', 'Product A', 10)
    const productB = ProductFactory.create('normal', 'Product B', 20)

    await productRepository.create(productA)
    await productRepository.create(productB)

    const result = await useCase.execute(null)
    expect(result).toEqual({
      products: [
        {
          id: productA.id,
          name: productA.name,
          price: productA.price
        },
        {
          id: productB.id,
          name: productB.name,
          price: productB.price
        }
      ]
    })
  })
})
