🏦 FintechFlow - Simulação Bancária

Link para Acesso: 🔗 Clique aqui para acessar a aplicação

Uma aplicação bancária (Frontend simulado) focada na qualidade de código, arquitetura escalável, UX fluida e segurança de dados em contexto de produção.

🚀 Decisões Técnicas Adotadas

O projeto foi estruturado utilizando as melhores práticas do ecossistema React para garantir manutenibilidade e performance:

Zustand: Gerenciamento de estado global leve e reativo, ideal para dados financeiros.

React Query + Axios: Gerenciamento de requisições com cache automático e sincronização de saldo/extrato.

React Hook Form + Zod: Validação rigorosa de formulários e tipos, garantindo que apenas dados válidos circulem na app.

Tailwind + shadcn/ui: Interface moderna, responsiva e com foco total em acessibilidade.

Vitest: Testes unitários focados na lógica de negócio (ex: validação de saldo para transferência).

🔒 Segurança (Proteção do Aplicativo)

Conforme os requisitos de segurança para aplicações financeiras, o projeto considera as seguintes proteções:

1. Engenharia Reversa

Minificação e Ofuscação: O processo de build transforma o código em um formato ilegível para humanos, dificultando o entendimento da lógica interna.

Remoção de Sourcemaps: Sourcemaps são desativados em produção para que o código original não seja exposto no navegador.

2. Vazamento de Dados

HttpOnly Cookies: Recomendação de uso de cookies protegidos para tokens JWT, evitando acesso via JavaScript (XSS).

Sanitização via Zod: Todos os inputs são limpos e validados no cliente antes de chegarem ao estado da aplicação.

Content Security Policy (CSP): Definição de origens confiáveis para carregamento de recursos, mitigando injeções maliciosas.

3. Integridade

Validação Dupla: As regras de negócio são aplicadas no frontend para UX e devem ser espelhadas no backend para impedir fraudes via interceptação de pacotes.

Protocolo HTTPS: Uso obrigatório de TLS/SSL para garantir que os dados não sejam alterados durante o trânsito (Integridade de ponta a ponta).

🛠️ Como rodar o projeto localmente

1. Clonar e Instalar dependências

git clone [https://github.com/luana100897/Onda-Finance.git](https://github.com/luana100897/Onda-Finance.git)
cd Onda-Finance
npm install


2. Rodar a Aplicação

npm run dev
Acesse: http://localhost:5173


Credenciais de acesso:

E-mail: maria@fintechflow.com
Senha: Senha@1234


📈 Melhorias Futuras

i18n: Suporte para múltiplos idiomas e moedas locais.

Gráficos Analíticos: Visualização de gastos e receitas com Recharts.

PWA: Transformar a aplicação em um App instalável (Offline-first).

Integração com Backend: Substituição do Mock por uma API REST real.

Este repositório serve como material descritivo e portfólio para o desafio JobZ_Talentos.