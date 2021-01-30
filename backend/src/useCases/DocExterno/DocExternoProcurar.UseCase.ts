import { inject, injectable } from "tsyringe";
import {
  IDocFiltro,
  IDocOut,
  IDocRepository,
} from "../../database/repositories/interfaces/IDocRepository";

@injectable()
export class DocExternoProcurarUseCase {
  constructor(@inject("DocExternoRepository") private _repo: IDocRepository) {}

  execute = async (filtro: IDocFiltro): Promise<IDocOut[]> => {
    return await this._repo.procurar(filtro);
  };
}
