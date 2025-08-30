import { verifyJwt } from '../utils/jwt.js';

export function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token não informado' });
  const [, token] = authHeader.split(' ');
  if (!token) return res.status(401).json({ message: 'Token inválido' });
  try {
    const payload = verifyJwt(token);
    req.userId = payload.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}
