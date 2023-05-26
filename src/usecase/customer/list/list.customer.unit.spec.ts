import { CustomerFactory } from '../../../domain/customer/factory/customerFactory'
import { Address } from '../../../domain/customer/valueObject/address'
import { ListCustomerUseCase } from './list.usecase'

const customer1 = CustomerFactory.createWithAddress('John Doe', new Address('Street 1', 1, 'zip-1', 'City 1'))
const customer2 = CustomerFactory.createWithAddress('Jane Doe', new Address('Street 2', 1, 'zip-2', 'City 2'))

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
    create: jest.fn(),
    update: jest.fn()
  }
}

describe('Unit test List Customer use case', () => {
  it('should list customers', async () => {
    const customerRepository = MockRepository()
    const useCase = new ListCustomerUseCase(customerRepository)

    const result = await useCase.execute(null)
    expect(result).toEqual({
      customers: [
        {
          id: customer1.id,
          name: customer1.name,
          address: {
            street: customer1.address.street,
            number: customer1.address.number,
            city: customer1.address.city,
            zip: customer1.address.zip
          }
        },
        {
          id: customer2.id,
          name: customer2.name,
          address: {
            street: customer2.address.street,
            number: customer2.address.number,
            city: customer2.address.city,
            zip: customer2.address.zip
          }
        }
      ]
    })
  })
})
