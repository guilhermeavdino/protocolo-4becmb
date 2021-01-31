import { Request, Response } from "express";
import { container } from "tsyringe";
import {
  IUsuarioAcessoIn,
  IUsuarioAdicionarIn,
  IUsuarioAtualizarIn,
} from "../../../database/repositories/interfaces/IUsuarioRepository";
import { UsuarioRemoverUseCase } from "../services/UsuarioRemover.UseCase";
import { UsuarioLerUseCase } from "../services/UsuarioLer.UseCase";
import { UsuarioAtualizarUseCase } from "../services/UsuarioAtualizar.UseCase";
import { UsuarioLerPorIdUseCase } from "../services/UsuarioLerPorId.UseCase";
import { UsuarioAdicionarUseCase } from "../services/UsuarioAdicionar.UseCase";
import { UsuarioLoginUseCase } from "../services/UsuarioLogin.UseCase.";

export class UsuarioController {
  constructor() {}

  lerUsuarios = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const _UsuarioLer = container.resolve(UsuarioLerUseCase);

    return resposta.json(await _UsuarioLer.execute());
  };

  lerUsuarioPorId = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const usuarioId = requisicao.params.usuarioId;

    if (usuarioId === " ")
      return resposta.json("Usuário não enviado para verificação");

    const _UsuarioLerPorId = container.resolve(UsuarioLerPorIdUseCase);

    return resposta.json(await _UsuarioLerPorId.execute(usuarioId));
  };

  remover = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const usuarioId = requisicao.params.usuarioId;

    if (usuarioId === " ")
      return resposta.json("Usuário não enviado para remoção");

    const _UsuarioLerPorId = container.resolve(UsuarioLerPorIdUseCase);

    if ((await _UsuarioLerPorId.execute(usuarioId)) === null)
      return resposta.json("Usuário não registrado no sistema");

    const _UsuarioRemover = container.resolve(UsuarioRemoverUseCase);

    return resposta.json(await _UsuarioRemover.execute(usuarioId));
  };

  adicionarUsuario = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const { nome, usuario, senha } = requisicao.body;

    if (nome === undefined || nome.length < 1 || nome.length > 20)
      return resposta.json("Nome não foi enviado corretamente");

    if (usuario === undefined || usuario.length < 1 || usuario.length > 20)
      return resposta.json("Usuário não foi enviada corretamente");

    if (senha === undefined || senha.length < 1 || senha.length > 20)
      return resposta.json("Senha não foi enviada corretamente");

    const dadosUsuario: IUsuarioAdicionarIn = {
      nome: nome,
      login: usuario,
      senha: senha,
    };

    const _UsuarioAdicionar = container.resolve(UsuarioAdicionarUseCase);

    return resposta.json(await _UsuarioAdicionar.execute(dadosUsuario));
  };

  atualizarUsuario = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const { nome, senha } = requisicao.body;
    const usuarioId = requisicao.params.usuarioId;

    const _UsuarioLerPorId = container.resolve(UsuarioLerPorIdUseCase);

    if (usuarioId === " ")
      return resposta.json("Usuário não foi enviado corretamente");

    if ((await _UsuarioLerPorId.execute(usuarioId)) === null)
      return resposta.json("Usuário não registrado no sistema");

    if (senha === undefined || senha.length < 1 || senha.length > 20)
      return resposta.json("Senha não foi enviada corretamente");

    if (nome === undefined || nome.length < 1 || nome.length > 20)
      return resposta.json("Nome não foi enviado corretamente");

    const dadosUsuario: IUsuarioAtualizarIn = {
      id: usuarioId,
      nome: nome,
      senha: senha,
    };

    const _UsuarioAtualizar = container.resolve(UsuarioAtualizarUseCase);

    return resposta.json(await _UsuarioAtualizar.execute(dadosUsuario));
  };

  login = async (
    requisicao: Request,
    resposta: Response
  ): Promise<Response> => {
    const { login, senha } = requisicao.body;

    if (senha === undefined || senha.length < 1 || senha.length > 20)
      return resposta.json("Senha não foi enviada corretamente");

    if (login === undefined || login.length < 1 || login.length > 20)
      return resposta.json("Login não foi enviado corretamente");

    const _UsuarioLogin = container.resolve(UsuarioLoginUseCase);

    return resposta.json(await _UsuarioLogin.execute(login, senha));
  };
}
