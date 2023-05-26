import { CustomerRepositoryInterface } from '../../../domain/customer/repository/customerRepositoryInterface'
import { InputListCustomerDTO, OutputListCustomerDTO } from './list.consumer.dto'

export class ListCustomerUseCase {
  constructor (private readonly customerRepository: CustomerRepositoryInterface) {}

  async execute (input: InputListCustomerDTO): Promise<OutputListCustomerDTO> {
    const customers = await this.customerRepository.findAll()
    return {
      customers: customers.map(customer => ({
        id: customer.id,
        name: customer.name,
        address: {
          street: customer.address.street,
          number: customer.address.number,
          city: customer.address.city,
          zip: customer.address.zip
        }
      }))
    }
  }
}
