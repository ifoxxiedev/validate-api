/*
@interface Validator<T>
@autor JimmyCodder
- The interface has a contractual interface to create a new validator's
*/
export interface IValidator<T> {
  /* 
  @method The required implementation interface method
  */
validate(value: T): boolean
}

/*
@class CPFValidator
@autor JimmyCodder
- The class has a responsability to validate a CPF number
*/
export class CPFValidator implements IValidator<string> {
  
/*
@method validDigit
- The method indentify last digit and calculate two last digits
*/
protected validDigit(cpf: string, baseOperation: number): boolean {

  // Identify target operatio, if 9 -> 11, if 10 -> 12
  const targetOperation = baseOperation + 2;

  // Split the cpf in array
  const cpfArray = cpf.split("");
  
  // Iterate into cpf numbers and sum all apply one calc per cpf number
  const sum = Array(baseOperation).fill(0)
   .map((_, index: number): number => Number(cpfArray[index]))
   .reduce((acc: number, cpfNumber: number, index: number) => acc + (cpfNumber * (targetOperation - (index + 1))), 0)
  
  // Check the sum calculated and reuturn if digit is valid
  let rest = (sum * 10) % 11    
  if (rest === 10 || rest === 11) rest = 0
  if (rest !== parseInt(cpf.substring(baseOperation, baseOperation + 1))) return false;
  
   return true;
}

/*
@method validate
- The method receive the cpf number into parameter and return tru or false if cpf number is valid!
*/
validate(cpf: string): boolean {
  // Check cpf parameter length
  if (!cpf || !cpf.length) return false

  // Replace the especial characters (._-) 
  cpf = cpf.replace(/[\._-]/gi, '')

  // Check cpf length after replace especial characters
  if (cpf.length < 11 || cpf === '00000000000' ) return false;

  // Run internal method to calculate cpf last digits
  return this.validDigit(cpf, 9) && this.validDigit(cpf, 10);
}
}

/*
Using the validator
const validator : IValidator<string> =  new CPFValidator();
const isValid = validator.validate('012.345.321-15')
console.log(isValid ? 'cpf valid' : 'cpf invalid');
*/