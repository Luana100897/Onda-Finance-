🏦 FintechFlow - Simulação Bancária

Link para Acesso: 🔗 [onda-finance-kjvo.vercel.app](https://onda-finance-kjvo.vercel.app)

Esta aplicação é uma simulação de frontend bancário desenvolvida para o desafio JobZ_Talentos, focada em arquitetura escalável, experiência de utilizador (UX) e segurança de dados.

🚀 Decisões Técnicas Adotadas

O projeto foi construído utilizando as melhores práticas do ecossistema React:

Zustand: Gestão de estado global leve para o saldo e dados do utilizador.

React Query + Axios: Sincronização automática de dados e gestão de cache.

Tailwind + shadcn/ui: Interface moderna, responsiva e acessível.

React Hook Form + Zod: Validação rigorosa de formulários e segurança de tipos.

Vite: Build tool ultra-rápida para uma melhor experiência de desenvolvimento.

🔒 Segurança (Proteção da Aplicação)

Para uma fintech, a segurança é o pilar principal. 
Implementamos as seguintes camadas:

1. Prevenção contra Engenharia Reversa

Minificação: O código JavaScript é compactado e transformado para dificultar a leitura humana.

Desativação de Sourcemaps: Em produção, os mapas de código estão desativados para proteger a lógica de negócio original.

2. Prevenção contra Vazamento de Dados

Sanitização via Zod: Todos os dados de entrada são validados antes de qualquer processamento.

Content Security Policy (CSP): Bloqueio de execução de scripts de terceiros não autorizados.

3. Integridade e Confidencialidade

HTTPS: Encriptação obrigatória em trânsito para todos os dados.

Validação Dupla: As regras de negócio são aplicadas no Frontend e preparadas para validação rigorosa no Backend.

🛠️ Como executar localmente

Instalar dependências:

npm install


Iniciar servidor de desenvolvimento:

npm run dev


Credenciais de Teste:

E-mail: maria@fintechflow.com

Senha: Senha@1234

📈 Melhorias Futuras

Implementação de i18n (Internacionalização).

Gráficos detalhados de despesas mensais.

Conversão para PWA (Progressive Web App).

Desenvolvido por Luana Caroline para fins de avaliação técnica.
