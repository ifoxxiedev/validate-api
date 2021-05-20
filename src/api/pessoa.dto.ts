import { Pessoa } from '../model/Pessoa';

export class PessoaDTO {
  public readonly nome;
  public readonly idade;
  public readonly cpf;
  public readonly id;

  constructor(data: Omit<Pessoa, 'id'>, id?: number) { 
    this.id = id ? id : Math.ceil((Math.random() * 99999) + 100000 - 1);
    this.nome = data.nome
    this.idade = data.idade
    this.cpf = data.cpf;
  } 
}