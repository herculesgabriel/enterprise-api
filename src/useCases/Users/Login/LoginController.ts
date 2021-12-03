import { Request, Response } from 'express';

import { LoginUseCase } from './LoginUseCase';

export class LoginController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const loginUseCase = new LoginUseCase();
    const token = await loginUseCase.execute({ email, password });

    response.status(200).json({ token });
  }
}
