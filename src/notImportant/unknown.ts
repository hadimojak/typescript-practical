let user: unknown;
user = 43;

function genError(message: string, code: number): never {
  throw { message: message, errorCode: code };
}

genError("error", 5000);
