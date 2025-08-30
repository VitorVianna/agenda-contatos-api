// src/docs/openapi.js
export default {
  openapi: '3.0.3',
  info: {
    title: 'Agenda de Contatos API',
    version: '1.0.0',
    description: 'API CRUD com JWT e MySQL (Usuarios, Enderecos, Contatos)'
  },
  servers: [{ url: 'http://localhost:3000/api', description: 'Local' }],
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }
    },
    schemas: {
      Usuario: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          nome: { type: 'string', example: 'Vitor' },
          email: { type: 'string', example: 'vitor@exemplo.com' },
          dataNascimento: { type: 'string', format: 'date', nullable: true },
          rg: { type: 'string', nullable: true },
          cpf: { type: 'string', nullable: true },
          enderecos: { type: 'array', items: { $ref: '#/components/schemas/Endereco' } },
          contatos: { type: 'array', items: { $ref: '#/components/schemas/Contato' } },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      UsuarioCreate: {
        type: 'object',
        required: ['nome','email','senha'],
        properties: {
          nome: { type: 'string' },
          email: { type: 'string', format: 'email' },
          senha: { type: 'string', minLength: 6 },
          dataNascimento: { type: 'string', format: 'date', nullable: true },
          rg: { type: 'string', nullable: true },
          cpf: { type: 'string', nullable: true }
        }
      },
      UsuarioUpdate: {
        type: 'object',
        properties: {
          nome: { type: 'string' },
          email: { type: 'string', format: 'email' },
          senha: { type: 'string', minLength: 6 },
          dataNascimento: { type: 'string', format: 'date', nullable: true },
          rg: { type: 'string', nullable: true },
          cpf: { type: 'string', nullable: true }
        }
      },
      Endereco: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          idUsuario: { type: 'integer', example: 1 },
          cep: { type: 'string', example: '12345000' },
          rua: { type: 'string', example: 'Rua A' },
          numero: { type: 'string', example: '123' },
          complemento: { type: 'string', nullable: true, example: 'Apto 12' },
          bairro: { type: 'string', example: 'Centro' },
          cidade: { type: 'string', example: 'São Paulo' },
          estado: { type: 'string', example: 'SP' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      EnderecoCreate: {
        type: 'object',
        required: ['cep','rua','numero','bairro','cidade','estado'],
        properties: {
          cep: { type: 'string' },
          rua: { type: 'string' },
          numero: { type: 'string' },
          complemento: { type: 'string', nullable: true },
          bairro: { type: 'string' },
          cidade: { type: 'string' },
          estado: { type: 'string', minLength: 2, maxLength: 2 }
        }
      },
      Contato: {
        type: 'object',
        properties: {
          id: { type: 'integer', example: 1 },
          idUsuario: { type: 'integer', example: 1 },
          numeroTelefone: { type: 'string', example: '+55 11 99999-0000' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' }
        }
      },
      ContatoCreate: {
        type: 'object',
        required: ['numeroTelefone'],
        properties: { numeroTelefone: { type: 'string' } }
      },
      LoginRequest: {
        type: 'object',
        required: ['email','senha'],
        properties: { email: { type: 'string', format: 'email' }, senha: { type: 'string' } }
      },
      LoginResponse: { type: 'object', properties: { token: { type: 'string' } } },
      Error: { type: 'object', properties: { message: { type: 'string' } } }
    }
  },
  tags: [{ name: 'Auth' }, { name: 'Usuarios' }, { name: 'Enderecos' }, { name: 'Contatos' }],
  paths: {
    '/auth/register': {
      post: {
        tags: ['Auth'],
        summary: 'Registrar novo usuário',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UsuarioCreate' } } } },
        responses: {
          201: { description: 'Criado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Usuario' } } } },
          400: { description: 'Erro de validação', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/auth/login': {
      post: {
        tags: ['Auth'],
        summary: 'Autenticar e obter token JWT',
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginRequest' } } } },
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginResponse' } } } },
          401: { description: 'Credenciais inválidas', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/usuarios': {
      get: {
        tags: ['Usuarios'],
        summary: 'Listar usuários',
        security: [{ bearerAuth: [] }],
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Usuario' } } } } },
          401: { description: 'Não autorizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/usuarios/{id}': {
      get: {
        tags: ['Usuarios'],
        summary: 'Obter usuário por ID',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Usuario' } } } },
          404: { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      put: {
        tags: ['Usuarios'],
        summary: 'Atualizar usuário',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/UsuarioUpdate' } } } },
        responses: {
          200: { description: 'Atualizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Usuario' } } } },
          404: { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      delete: {
        tags: ['Usuarios'],
        summary: 'Remover usuário',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Removido', content: { 'application/json': { schema: { type: 'object', properties: { deleted: { type: 'boolean', example: true } } } } } },
          404: { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/usuarios/{idUsuario}/enderecos': {
      post: {
        tags: ['Enderecos'],
        summary: 'Criar endereço para usuário',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'idUsuario', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/EnderecoCreate' } } } },
        responses: {
          201: { description: 'Criado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Endereco' } } } },
          400: { description: 'Erro', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      get: {
        tags: ['Enderecos'],
        summary: 'Listar endereços do usuário',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'idUsuario', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Endereco' } } } } }
        }
      }
    },
    '/enderecos/{id}': {
      get: {
        tags: ['Enderecos'],
        summary: 'Obter endereço por ID',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Endereco' } } } },
          404: { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      put: {
        tags: ['Enderecos'],
        summary: 'Atualizar endereço',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/EnderecoCreate' } } } },
        responses: {
          200: { description: 'Atualizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Endereco' } } } },
          404: { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      delete: {
        tags: ['Enderecos'],
        summary: 'Remover endereço',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Removido', content: { 'application/json': { schema: { type: 'object', properties: { deleted: { type: 'boolean', example: true } } } } } },
          404: { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/usuarios/{idUsuario}/contatos': {
      post: {
        tags: ['Contatos'],
        summary: 'Criar contato para usuário',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'idUsuario', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ContatoCreate' } } } },
        responses: {
          201: { description: 'Criado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Contato' } } } },
          400: { description: 'Erro', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      get: {
        tags: ['Contatos'],
        summary: 'Listar contatos do usuário',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'idUsuario', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { type: 'array', items: { $ref: '#/components/schemas/Contato' } } } } }
        }
      }
    },
    '/contatos/{id}': {
      get: {
        tags: ['Contatos'],
        summary: 'Obter contato por ID',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'OK', content: { 'application/json': { schema: { $ref: '#/components/schemas/Contato' } } } },
          404: { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      put: {
        tags: ['Contatos'],
        summary: 'Atualizar contato',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        requestBody: { required: true, content: { 'application/json': { schema: { $ref: '#/components/schemas/ContatoCreate' } } } },
        responses: {
          200: { description: 'Atualizado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Contato' } } } },
          404: { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      },
      delete: {
        tags: ['Contatos'],
        summary: 'Remover contato',
        security: [{ bearerAuth: [] }],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          200: { description: 'Removido', content: { 'application/json': { schema: { type: 'object', properties: { deleted: { type: 'boolean', example: true } } } } } },
          404: { description: 'Não encontrado', content: { 'application/json': { schema: { $ref: '#/components/schemas/Error' } } } }
        }
      }
    },
    '/health': {
      get: { tags: ['Auth'], summary: 'Healthcheck', responses: { 200: { description: 'OK' } } }
    }
  }
};
