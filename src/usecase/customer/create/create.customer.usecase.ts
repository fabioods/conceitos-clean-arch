import { CustomerFactory } from '../../../domain/customer/factory/customerFactory'
import { CustomerRepositoryInterface } from '../../../domain/customer/repository/customerRepositoryInterface'
import { Address } from '../../../domain/customer/valueObject/address'
import { InputCreateCustomerDTO, OutputCreateCustomerDTO } from './create.customer.dto'
import { v4 as uuid } from 'uuid'

export class CreateCustomerUseCase {
  constructor (private readonly customerRepository: CustomerRepositoryInterface) {}

  async execute (input: InputCreateCustomerDTO): Promise<OutputCreateCustomerDTO> {
    const address = new Address(input.address.street, input.address.number, input.address.zipcode, input.address.city)
    const customer = CustomerFactory.createWithAddress(input.name, address)
    await this.customerRepository.create(customer)

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        city: customer.address.city,
        number: customer.address.number,
        zipcode: customer.address.zip
      }
    }
  }
}
