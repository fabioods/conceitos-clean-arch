import { CustomerRepositoryInterface } from '../../../domain/customer/repository/customerRepositoryInterface'
import { InputFindCustomerDTO, OutputFindCustomerDTO } from './find.customer.dto'

export class FindCustomerUseCase {
  constructor (private readonly customerRepository: CustomerRepositoryInterface) {}

  async execute (input: InputFindCustomerDTO): Promise<OutputFindCustomerDTO> {
    const customer = await this.customerRepository.find(input.id)
    const output: OutputFindCustomerDTO = {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.address.street,
        number: customer.address.number,
        zipcode: customer.address.zip,
        city: customer.address.city
      }
    }
    return output
  }
}
