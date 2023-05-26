import { ProductFactory } from '../../../domain/product/factory/productFactory'
import { ListProductUseCase } from './list.product.usecase'

const productA = ProductFactory.create('normal', 'Product A', 10)
const productB = ProductFactory.create('normal', 'Product B', 20)

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([productA, productB])),
    update: jest.fn()
  }
}

describe('Unit test List Product use case', () => {
  it('should list products', async () => {
    const productRepository = MockRepository()
    const useCase = new ListProductUseCase(productRepository)

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
