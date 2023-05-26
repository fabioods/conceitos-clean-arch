import { CustomerSequelizeRepository } from '../../../infra/customer/repository/sequelize/customerSequelizeRepository'
import { Customer } from '../../../domain/customer/entity/customer'
import { Address } from '../../../domain/customer/valueObject/address'
import { FindCustomerUseCase } from './find.customer.usercase'

const customer = new Customer('1', 'John Doe')
const address = new Address('Street', 1, '12345678', 'City')
customer.defineAddress(address)

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test Find Customer use case', () => {
  it('should find customer by id', async () => {
    const customerRepository = MockRepository()
    const useCase = new FindCustomerUseCase(customerRepository)

    await customerRepository.create(customer)

    const input = { id: '1' }
    const output = {
      id: '1',
      name: 'John Doe',
      address: {
        street: 'Street',
        number: 1,
        zipcode: '12345678',
        city: 'City'
      }
    }

    const result = await useCase.execute(input)
    expect(result).toEqual(output)
  })

  it('should not find customer by id', async () => {
    const customerRepository = MockRepository()
    customerRepository.find.mockImplementation(() => { throw new Error('Customer not found') })
    const useCase = new FindCustomerUseCase(customerRepository)
    await customerRepository.create(customer)

    const input = { id: '1' }

    await expect(useCase.execute(input)).rejects.toThrowError('Customer not found')
  })
})
