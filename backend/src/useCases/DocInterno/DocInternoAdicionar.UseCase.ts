import { injectable, inject } from "tsyringe";
import {
  IDocIn,
  IDocOut,
  IDocRepository,
} from "../../database/repositories/interfaces/IDocRepository";

@injectable()
export class DocInternoAdicionarUseCase {
  constructor(@inject("DocInternoRepository") private _repo: IDocRepository) {}

  execute = async (documentoRecebido: IDocIn): Promise<IDocOut> => {
    return await this._repo.adicionar(documentoRecebido);
  };
}
