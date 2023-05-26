import { ProductFactory } from '../../../domain/product/factory/productFactory'
import { FindProductUseCase } from './find.product.usecase'

const input = {
  id: '1'
}

const product = ProductFactory.create('normal', 'Product A', 10)

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test Find Product use case', () => {
  it('should find product by id', async () => {
    const productRepository = MockRepository()
    const useCase = new FindProductUseCase(productRepository)

    await productRepository.create(product)

    const output = {
      id: expect.any(String),
      name: 'Product A',
      price: 10
    }

    const result = await useCase.execute(input)
    expect(result).toEqual(output)
  })

  it('should not find product by id', async () => {
    const productRepository = MockRepository()
    productRepository.find.mockImplementation(() => { throw new Error('Product not found') })
    const useCase = new FindProductUseCase(productRepository)
    await productRepository.create(product)

    await expect(useCase.execute(input)).rejects.toThrowError('Product not found')
  })
})
