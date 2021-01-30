import { inject, injectable } from "tsyringe";
import { IDocRepository } from "../../database/repositories/interfaces/IDocRepository";

@injectable()
export class DocInternoRemoverUseCase {
  constructor(@inject("DocInternoRepository") private _repo: IDocRepository) {}

  execute = async (documentoID: string): Promise<boolean> => {
    return await this._repo.remover(documentoID);
  };
}
