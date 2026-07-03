import { Router } from "express";
import { UsersController } from "@/controllers/users-controller";
import { forceClientRole } from "@/middlewares/force-client-role";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";
import { upload } from "@/middlewares/upload";

const usersRoutes = Router();
const usersController = new UsersController();

// Rota pública — cadastro de cliente (sempre role = "client")
usersRoutes.post("/public", forceClientRole, usersController.create);

// Rotas protegidas (usuário precisa estar logado)
usersRoutes.use(ensureAuthenticated);

// Apenas admin pode criar técnico ou listar usuários
usersRoutes.post(
  "/",
  verifyUserAuthorization(["admin"]),
  usersController.create
);
usersRoutes.get("/", verifyUserAuthorization(["admin"]), usersController.index);

// Atualizar usuário (Admin pode qualquer um; técnicos e clientes só o próprio)
usersRoutes.put("/:id", usersController.update);

// Atualizar avatar
usersRoutes.patch("/:id/avatar", upload.single("avatar"), usersController.updateAvatar);

// Apenas admin ou dono da conta pode deletar
usersRoutes.delete("/:id", usersController.delete);

export { usersRoutes };
