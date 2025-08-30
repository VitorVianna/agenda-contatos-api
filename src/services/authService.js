import { usuarioRepository } from '../repositories/index.js';
import { hashPassword, comparePassword } from '../utils/password.js';
import { signJwt } from '../utils/jwt.js';

export const authService = {
  async register({ nome, email, senha, dataNascimento, rg, cpf }) {
    const existing = await usuarioRepository.findByEmail(email);
    if (existing) throw new Error('E-mail já cadastrado');
    const senhaHash = await hashPassword(senha);
    const user = await usuarioRepository.create({ nome, email, senha: senhaHash, dataNascimento, rg, cpf });
    const { senha: _, ...safe } = user.toJSON();
    return safe;
  },
  async login({ email, senha }) {
    const user = await usuarioRepository.findByEmail(email);
    if (!user) throw new Error('Credenciais inválidas');
    const ok = await comparePassword(senha, user.senha);
    if (!ok) throw new Error('Credenciais inválidas');
    const token = signJwt({ id: user.id, email: user.email });
    return { token };
  }
};
