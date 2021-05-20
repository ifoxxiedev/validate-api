
export class ExceptionHandleError {
  static throwWhen(expression: boolean, error: Error) {
    if (expression) throw error
  }
}

