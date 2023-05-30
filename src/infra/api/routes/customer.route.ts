/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import { CreateCustomerUseCase } from '../../../usecase/customer/create/create.customer.usecase'
import { CustomerSequelizeRepository } from '../../customer/repository/sequelize/customerSequelizeRepository'
import { ListCustomerUseCase } from '../../../usecase/customer/list/list.usecase'

export const customerRoute = express.Router()

customerRoute.post('/', async (req: Request, res: Response) => {
  const useCase = new CreateCustomerUseCase(new CustomerSequelizeRepository())
  try {
    const customerDTO = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        city: req.body.address.city,
        number: req.body.address.number,
        zipcode: req.body.address.zipcode
      }
    }
    const output = await useCase.execute(customerDTO)
    res.status(200).json(output)
  } catch (error) {
    res.status(500).send(error)
  }
})

customerRoute.get('/', async (req: Request, res: Response) => {
  const useCase = new ListCustomerUseCase(new CustomerSequelizeRepository())
  const output = await useCase.execute({})
  res.status(200).json(output.customers)
})
