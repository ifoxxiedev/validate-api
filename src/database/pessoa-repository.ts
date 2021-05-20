import { Pessoa } from "../model/Pessoa";

export class PessoaRepository {
  private data: Array<Pessoa>
  constructor() {
    this.data = [
      new Pessoa(1, 'Iago Ferreira', 20, '10112356095'),
      new Pessoa(2, 'Caren Ferreira', 19, '44678324089'),
      new Pessoa(3, 'Pedro Vitor', 21, '87068417086')
    ]
  }

  async save(pessoa: Pessoa): Promise<void> {
    this.data.push(pessoa)
  }

  async updateOne(id: number, pessoaNova: Pessoa): Promise<void> {
    const pessoaIndex = this.data.findIndex(d => d.id === id)
    if (pessoaIndex === -1) throw new Error('Pessoa não encontrada para atualização');

    this.data.splice(pessoaIndex, 1, pessoaNova);
  }


  deleteOne(id: number) {
    const pessoaIndex = this.data.findIndex(d => d.id === id)
    this.data.splice(pessoaIndex, 1);
  }

  async findOne(id: number): Promise<Pessoa | undefined> {
    return this.data.find(d => d.id === id)
  }

  async findAll(): Promise<Array<Pessoa>> {
    return this.data;
  }
}