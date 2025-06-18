# Build Manual com TypeScript

Este projeto está configurado para usar compilação manual com TypeScript, seguindo o método mais simples e direto.

## Como Funciona

### Configuração Implementada

1. **TypeScript instalado** como dependência de desenvolvimento
2. **tsconfig.json** configurado para compilação simples:
   - Compila de `./src` para `./dist`
   - Usa ES6 como target
   - Configurações menos restritivas para facilitar o build

3. **Scripts no package.json**:
   - `npm run build`: Executa a compilação completa
   - `npm run copy-html`: Copia e ajusta o HTML

### Processo de Build

Quando você executa `npm run build`, o processo faz:

1. **Compila TypeScript**: `npx tsc`
   - Converte todos os arquivos `.ts/.tsx` em `.js`
   - Salva na pasta `dist/`

2. **Copia e ajusta HTML**:
   - Copia `index.html` para `dist/`
   - Muda a referência de `./src/main.tsx` para `./main.js`
   - Copia arquivos CSS necessários

3. **Resultado**: Pasta `dist/` pronta para publicação

### Para Atualizar o Site

1. Faça suas alterações nos arquivos `.ts/.tsx`
2. Execute: `npm run build`
3. Faça commit e push das alterações (incluindo a pasta `dist/`)
4. O GitHub Pages será atualizado automaticamente

### Configuração do GitHub Pages

Para configurar o GitHub Pages:

1. Vá em **Settings > Pages** no seu repositório
2. Em "Build and deployment", selecione "Deploy from a branch"
3. Escolha o branch `main` e a pasta `/dist`
4. Salve as configurações

### Estrutura de Arquivos

```
projeto/
├── src/           # Código TypeScript original
├── dist/          # Código JavaScript compilado (para publicação)
├── tsconfig.json  # Configuração do TypeScript
└── package.json   # Scripts de build
```

### Vantagens desta Abordagem

- ✅ Processo simples e direto
- ✅ Não depende de ferramentas complexas
- ✅ Fácil de entender e debugar
- ✅ Controle total sobre o processo de build
- ✅ Compatível com GitHub Pages

### Scripts Disponíveis

- `npm run build`: Build completo (TypeScript + HTML + CSS)
- `npm run build:vite`: Build original com Vite (mantido como backup)
- `npm run dev`: Servidor de desenvolvimento 