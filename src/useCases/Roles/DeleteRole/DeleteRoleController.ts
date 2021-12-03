import { Request, Response } from 'express';

import { DeleteRoleUseCase } from './DeleteRoleUseCase';

export class DeleteRoleController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deleteRoleUseCase = new DeleteRoleUseCase();
    await deleteRoleUseCase.execute(id);

    response.status(204).send();
  }
}
