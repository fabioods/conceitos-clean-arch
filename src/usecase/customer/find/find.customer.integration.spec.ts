import { Sequelize } from 'sequelize-typescript'
import { CustomerModel } from '../../../infra/customer/repository/sequelize/model/customerModel'
import { CustomerSequelizeRepository } from '../../../infra/customer/repository/sequelize/customerSequelizeRepository'
import { Customer } from '../../../domain/customer/entity/customer'
import { Address } from '../../../domain/customer/valueObject/address'
import { FindCustomerUseCase } from './find.customer.usercase'

describe('Test Find Customer use case', () => {
  let sequelize: Sequelize
  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true }
    })
    sequelize.addModels([CustomerModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should find customer by id', async () => {
    const customerRepository = new CustomerSequelizeRepository()
    const useCase = new FindCustomerUseCase(customerRepository)

    const customer = new Customer('1', 'John Doe')
    const address = new Address('Street', 1, '12345678', 'City')
    customer.defineAddress(address)

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
})
