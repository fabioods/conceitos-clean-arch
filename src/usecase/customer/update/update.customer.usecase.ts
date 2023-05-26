import { CustomerRepositoryInterface } from '../../../domain/customer/repository/customerRepositoryInterface'
import { Address } from '../../../domain/customer/valueObject/address'
import { InputUpdateCustomerDTO, OutputUpdateCustomerDTO } from './update.customer.dto'

export class UpdateCustomerUseCase {
  constructor (private readonly customerRepository: CustomerRepositoryInterface) {}

  async execute (input: InputUpdateCustomerDTO): Promise<OutputUpdateCustomerDTO> {
    const customer = await this.customerRepository.find(input.id)
    customer.changeName(input.name)
    const address = new Address(input.address.street, input.address.number, input.address.zip, input.address.city)
    customer.defineAddress(address)
    await this.customerRepository.update(customer)
    return {
      id: input.id,
      name: input.name,
      address: {
        street: input.address.street,
        number: input.address.number,
        city: input.address.city,
        zip: input.address.zip
      }
    }
  }
}
