import { CustomerFactory } from '../../../domain/customer/factory/customerFactory'
import { Address } from '../../../domain/customer/valueObject/address'
import { UpdateCustomerUseCase } from './update.customer.usecase'

const customerWithAddress = CustomerFactory.createWithAddress('John Doe', new Address('Street', 1, '12345678', 'City'))

const input = {
  id: customerWithAddress.id,
  name: 'John Doe Updated',
  address: {
    street: 'Street Updated',
    number: 2,
    city: 'City Updated',
    zip: '123456789'
  }
}

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customerWithAddress)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test Update Customer use case', () => {
  it('should update customer', async () => {
    const customerRepository = MockRepository()
    const useCase = new UpdateCustomerUseCase(customerRepository)

    const result = await useCase.execute(input)
    expect(result).toEqual(input)
  })
})
