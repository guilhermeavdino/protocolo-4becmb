import { Router } from "express";
import { UsuarioController } from "../useCases/Usuarios/controllers/Usuario.Controller";

const rotasUsuario = Router();
const controllerUsuario = new UsuarioController();

rotasUsuario.post("/usuario/adicionar", controllerUsuario.adicionarUsuario);
rotasUsuario.delete("/usuario/remover/:usuarioId", controllerUsuario.remover);
rotasUsuario.get("/usuario/ler", controllerUsuario.lerUsuarios);
rotasUsuario.put(
  "/usuario/atualizar/:usuarioId",
  controllerUsuario.atualizarUsuario
);
rotasUsuario.get("/usuario/ler/:usuarioId", controllerUsuario.lerUsuarioPorId);
rotasUsuario.get("/usuario/login", controllerUsuario.login);

export { rotasUsuario };
