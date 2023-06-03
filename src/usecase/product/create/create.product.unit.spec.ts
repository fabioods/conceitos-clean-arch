import { CreateProductUseCase } from './create.product.usecase'

const input = {
  name: 'Product A',
  price: 10
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn()
  }
}

describe('CreateProduct unit', () => {
  it('should create a product', async () => {
    const repository = MockRepository()
    const useCase = new CreateProductUseCase(repository)
    const product = await useCase.execute(input)

    const output = {
      id: expect.any(String),
      ...input
    }
    expect(product).toEqual(output)
  })

  it('should return an error when call create', async () => {
    const repository = MockRepository()
    repository.create.mockImplementation(() => { throw new Error('Error') })
    const useCase = new CreateProductUseCase(repository)

    await expect(useCase.execute(input)).rejects.toThrowError('Error')
  })

  it('should thrown an error when name is missing', async () => {
    const repository = MockRepository()
    const useCase = new CreateProductUseCase(repository)

    const inputWithoutName = Object.assign({}, input)
    inputWithoutName.name = ''

    await expect(useCase.execute(inputWithoutName)).rejects.toThrow('product: Name is required')
  })
})
