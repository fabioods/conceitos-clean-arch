export interface InputCreateCustomerDTO {
  name: string
  address: {
    street: string
    city: string
    number: number
    zipcode: string
  }
}

export interface OutputCreateCustomerDTO {
  id: string
  name: string
  address: {
    street: string
    city: string
    number: number
    zipcode: string
  }
}
