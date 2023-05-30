/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response } from 'express'
import { CreateProductUseCase } from '../../../usecase/product/create/create.product.usecase'
import { ProductSequelizeRepository } from '../../product/repository/sequelize/productSequelizeRepository'
import { ListProductUseCase } from '../../../usecase/product/list/list.product.usecase'

export const productRoute = express.Router()

productRoute.post('/', async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductSequelizeRepository())
  try {
    const productDTO = {
      name: req.body.name,
      price: req.body.price
    }
    const output = await useCase.execute(productDTO)
    res.status(200).json(output)
  } catch (error) {
    res.status(500).send(error)
  }
})

productRoute.get('/', async (req: Request, res: Response) => {
  const useCase = new ListProductUseCase(new ProductSequelizeRepository())
  const output = await useCase.execute({})
  res.status(200).json(output.products)
})
