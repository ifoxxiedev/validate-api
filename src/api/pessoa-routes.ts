import express from 'express';
import { check } from 'express-validator';
import { catchAsync, validateRequestPayload } from '@ifexcorp/rest-express-utils';
import { PessoaRepository } from '../database/pessoa-repository';
import { NotFoundError, HttpStatusCode, BadRequestError } from '@ifexcorp/rest-http-errors';
import { ExceptionHandleError } from '../util/exception-handler';
import { Pessoa } from '../model/Pessoa';
import { PessoaDTO } from './pessoa.dto';

import { CPFValidator } from './validators/cpf-validator'

const repository = new PessoaRepository();
const router = express.Router();
const validators = [
  check('nome').not().isEmpty().withMessage('O campo nome é obrigatório'),
  check('idade').not().isEmpty().withMessage('O campo idade é obrigatório'),
  check('cpf').not().isEmpty().withMessage('O campo cpf  é obrigatório'),
  check('cpf').custom((value) => {
    ExceptionHandleError.throwWhen(!new CPFValidator().validate(value), new BadRequestError('CPF inválido'));
    return true
  })
]

router.param('id', catchAsync(async (req, res, next) => {
  const pessoa = await repository.findOne(Number(req.params.id));
  ExceptionHandleError.throwWhen(!pessoa, new NotFoundError('A pessoa não foi encontrada!'))
  next();
}))

router.get('/', catchAsync(async (req, res, next) => {
  const pessoas = await repository.findAll();
  res.status(HttpStatusCode.OK).json({ result: pessoas});
}))

router.get('/:id', catchAsync(async (req, res, next) => {
  const pessoa = await repository.findOne(Number(req.params.id));
  res.status(HttpStatusCode.OK).json({ result: pessoa });
}))

router.post('/', validators, 
validateRequestPayload,
catchAsync(async (req, res, next) => {
  req.body.cpf = req.body.cpf.replace(/[\._-]/gi, '')
  const dto = new PessoaDTO(req.body)
  const pessoa = new Pessoa(dto.id, dto.nome, dto.idade, dto.cpf);
  repository.save(pessoa);
  res.status(HttpStatusCode.CREATED).json({result: pessoa})
}))


router.put('/:id', 
validators, 
validateRequestPayload,
catchAsync(async (req, res, next) => {
  req.body.cpf = req.body.cpf.replace(/[\._-]/gi, '')
  const dto = new PessoaDTO(req.body)

  const pessoa = new Pessoa(dto.id, dto.nome, dto.idade, dto.cpf);
  await repository.updateOne(Number(req.params.id), pessoa)
  res.status(HttpStatusCode.NO_CONTENT).end()
}))


router.delete('/:id', catchAsync(async (req, res, next) => {


  await repository.deleteOne(Number(req.params.id))
  res.status(HttpStatusCode.NO_CONTENT).end()
}))

export default router;


