import { CreateCustomerUseCase } from './create.customer.usecase'

const input = {
  name: 'John Doe',
  address: {
    street: 'Rua dos Bobos',
    city: 'São Paulo',
    number: 1,
    zipcode: '00000-000'
  }
}

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    findAll: jest.fn(),
    update: jest.fn()
  }
}

describe('CreateCustomer', () => {
  it('should create a customer', async () => {
    const repository = MockRepository()
    const useCase = new CreateCustomerUseCase(repository)
    const customer = await useCase.execute(input)

    const output = {
      id: expect.any(String),
      ...input
    }
    expect(customer).toEqual(output)
  })

  it('should return an error when call create', async () => {
    const repository = MockRepository()
    repository.create.mockImplementation(() => { throw new Error('Error') })
    const useCase = new CreateCustomerUseCase(repository)

    await expect(useCase.execute(input)).rejects.toThrowError('Error')
  })

  it('should thrown an error when name is missing', async () => {
    const repository = MockRepository()
    const useCase = new CreateCustomerUseCase(repository)

    const inputWithoutName = Object.assign({}, input)
    inputWithoutName.name = ''

    await expect(useCase.execute(inputWithoutName)).rejects.toThrow('customer: Name is required')
  })
})
