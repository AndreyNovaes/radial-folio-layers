import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

// Debug: verificar se as variáveis foram carregadas
console.log(`[DEBUG] RESEND_API_KEY: ${process.env.RESEND_API_KEY ? 'loaded' : 'NOT LOADED'}`);
console.log(`[DEBUG] CONTACT_EMAIL: ${process.env.CONTACT_EMAIL}`);

app.use(cors());
app.use(express.json());

// Middleware: carrega e executa funções em api/
app.use('/api/', async (req: Request, res: Response) => {
  try {
    // Extrair o caminho após /api/
    const route = req.path.replace(/^\//, '') || 'send-email';
    let functionPath = path.join(__dirname, 'api', `${route}.ts`);

    // Se .ts não existe, tentar .js
    if (!fs.existsSync(functionPath)) {
      functionPath = path.join(__dirname, 'api', `${route}.js`);
    }

    // Importar dinamicamente a função
    const module = await import(`file://${functionPath}`);
    const handler = module.default;

    if (typeof handler !== 'function') {
      return res.status(500).json({ error: 'Handler is not a function' });
    }

    const vercelReq = {
      method: req.method,
      body: req.body,
      query: req.query,
      headers: req.headers,
    };

    let responded = false;
    const vercelRes = {
      status: (code: number) => {
        res.status(code);
        return vercelRes;
      },
      json: (data: unknown) => {
        responded = true;
        res.json(data);
        return vercelRes;
      },
      send: (data: unknown) => {
        responded = true;
        res.send(data);
        return vercelRes;
      },
      statusCode: 200,
      setHeader: (name: string, value: string | number | readonly string[]) => {
        res.setHeader(name, value);
        return vercelRes;
      },
    };

    // Executar handler
    await handler(vercelReq, vercelRes);

    if (!responded) {
      res.json({ message: 'OK' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({
      error: error instanceof Error ? error.message : 'Internal Server Error'
    });
  }
});

app.listen(PORT, () => {
  console.log(`\n✅ Development API Server rodando em http://localhost:${PORT}`);
  console.log(`📝 Abra outro terminal e rode: npm run dev\n`);
});
