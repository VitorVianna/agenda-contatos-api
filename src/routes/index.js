import { Router } from 'express';
import { authController } from '../controllers/authController.js';
import { usuarioController } from '../controllers/usuarioController.js';
import { enderecoController } from '../controllers/enderecoController.js';
import { contatoController } from '../controllers/contatoController.js';
import { authMiddleware } from '../middlewares/authMiddleware.js';

const router = Router();

// Health
router.get('/health', (req, res) => res.json({ status: 'ok' }));

// Auth (public)
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);

// Protected routes
router.use(authMiddleware);

// Usuarios
router.get('/usuarios', usuarioController.list);
router.get('/usuarios/:id', usuarioController.get);
router.put('/usuarios/:id', usuarioController.update);
router.delete('/usuarios/:id', usuarioController.remove);

// Enderecos (nested)
router.post('/usuarios/:idUsuario/enderecos', enderecoController.create);
router.get('/usuarios/:idUsuario/enderecos', enderecoController.listByUser);
router.get('/enderecos/:id', enderecoController.get);
router.put('/enderecos/:id', enderecoController.update);
router.delete('/enderecos/:id', enderecoController.remove);

// Contatos (nested)
router.post('/usuarios/:idUsuario/contatos', contatoController.create);
router.get('/usuarios/:idUsuario/contatos', contatoController.listByUser);
router.get('/contatos/:id', contatoController.get);
router.put('/contatos/:id', contatoController.update);
router.delete('/contatos/:id', contatoController.remove);

export default router;
