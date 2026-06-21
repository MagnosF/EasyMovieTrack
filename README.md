# EasyMovieTrack - EPIC 1 & EPIC 2 (Consolidado) 🎬

<p align="center">
  <img src="https://img.shields.io/badge/React__Native-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
</p>

O **EasyMovieTrack** é um aplicativo mobile completo para gestão de utilizadores, catálogo cinematográfico e controle de histórico pessoal de filmes assistidos. O projeto integra o consumo resiliente de APIs externas com persistência e cache offline em banco de dados local.

**Desenvolvedor:** Magno Ferreira Santos  
**Disciplina:** Projeto Aplicado em Desenvolvimento de Sistemas  
**Tecnologias:** React Native, Expo (SDK 51), SQLite (`expo-sqlite`), Axios, Expo Crypto, TMDB API.

---

## 📌 Sobre o Projeto

Este repositório consolida as duas primeiras etapas do ciclo de desenvolvimento do ecossistema:
* **EPIC 1 - Gestão de Acesso e Perfil:** Focado na infraestrutura de segurança local, autenticação, níveis de acesso diferenciados (Admin/Comum) e customização de perfil com imagens da galeria nativa.
* **EPIC 2 - Sistema de Avaliação e Catálogo:** Focado na integração de dados assíncronos em tempo real com a API internacional do TMDB, tratamento inteligente de falhas com fallback de tradução automática, histórico de exibição offline e mural de discussões com threads de respostas aninhadas.

---

## 🚀 Funcionalidades Implementadas (Histórias de Usuário)

### 🔑 EPIC 1: Gestão de Acesso e Perfil
* **HU1 & HU3 - Registro Seguro & Validação:** Cadastro de contas locais com sanitização de campos e validações de segurança (barramento para senhas com menos de 6 caracteres). Proteção de dados sensíveis utilizando criptografia hash **SHA256** via `expo-crypto` antes da gravação no SQLite.
* **HU2 & HU5 - Personalização de Perfil (UI):** Interface intuitiva para edição de codinome, cores de avatar e ícones. Integração com a galeria nativa do dispositivo através do `Expo Image Picker` para upload de fotos de perfil com ajuste de proporção 1:1.
* **HU4 - Perfis de Acesso Diferenciados:** Controle de autorização baseado em papéis (*roles*). Usuários administradores possuem acesso exclusivo a um painel de monitoramento para gerenciamento da listagem de utilizadores cadastrados.

### 🎬 EPIC 2: Sistema de Avaliação e Catálogo
* **HU6 - Catálogo e Busca Inteligente com Fallback:** Consumo dinâmico dos endpoints do TMDB para exibição de filmes populares, tendências e filtros por gênero. O motor de busca possui ordenação de relevância alfabética e priorização no topo para títulos correspondentes ao início da busca. Conta com um **Mecanismo de Fallback Automatizado** via API do Google Tradutor que traduz títulos e sinopses em tempo real caso o servidor externo não os forneça em português.
* **HU7 & HU8 - Controle de Filmes Assistidos & Aba Histórico:** Sinalização imediata do status "Assistido/Não Assistido" nas telas de detalhes. O aplicativo salva a ação em uma tabela associativa local no SQLite e alimenta a aba dedicada de Histórico em ordem cronológica reversa, garantindo o acesso aos dados mesmo offline.
* **HU9 & HU10 - Avaliação por Estrelas & Mural com Threads:** Sistema interativo de feedback contendo notas de 1 a 5 estrelas e comentários em texto. O mural possui arquitetura de **threads de sub-respostas aninhadas** usando compressão textual delimitada (`➡️[RESP_START]` e `[RESP_END]`), o que evita queries complexas e mantém o banco leve. Possui atualização retroativa assíncrona ligada a mudanças no perfil do usuário.

---

## 🏗️ Arquitetura do Projeto

Abaixo está o mapeamento real da estrutura modularizada de arquivos do aplicativo:

```text
EasyMovieTrack/
├── app/                          # Roteamento Base (Expo Router)
│   ├── (tabs)/                   # Navegação por Abas Principais
│   │   ├── _layout.js            # Configuração, rotas e estilização visual da Tab Bar inferior
│   │   ├── history.js            # Aba: Histórico de filmes assistidos (HU8)
│   │   ├── movies.js             # Aba: Catálogo e busca de filmes (HU6)
│   │   └── profile.js            # Aba: Perfil e customização (HU2/HU5)
│   ├── movie/                    # Sub-rotas dinâmicas
│   │   └── [id].js               # Detalhes, Sinalização e Mural (HU7/HU9/HU10)
│   ├── _layout.js                # Provedor global e navegação raiz
│   ├── admin-users.js            # Painel Administrativo de gestão (HU4)
│   ├── forgot-password.js        # Interface de recuperação de credenciais
│   ├── index.js                  # Ponto de entrada / Tela de Autenticação
│   ├── modal.js                  # Componentes auxiliares de pop-up
│   └── register.js               # Tela de Registro com Hash SHA256 (HU1/HU3)
├── src/                          # Módulos de Core Code e Serviços
│   ├── database/                 
│   │   └── initializeDatabase.js # Inicialização e Migrations das tabelas SQLite
│   ├── services/                 
│   │   ├── api.js                # Cliente Axios, Endpoints TMDB e Tradutor Fallback
│   │   ├── authSession.js        # Simulação e gerenciamento de sessão ativa
│   │   └── movieStorage.js       # Operações de persistência local de filmes e interações
│   └── styles/                   
│       └── globalStyles.js       # Design System unificado e estilização base
├── components/                   # Componentes atômicos reutilizáveis (botões, cards)
├── constants/                    # Paleta de cores (Theme.js) e tokens de UI
└── app.json                      # Configurações globais do ecossistema Expo
```

---

## 📦 Get started

Siga os passos abaixo para configurar o ambiente e executar o projeto localmente:

1. **Clonar o repositório**
   ```bash
      git clone [https://github.com/MagnosF/EasyMovieTrack.git](https://github.com/MagnosF/EasyMovieTrack.git)
      cd EasyMovieTrack
   ```
      
2. **Instalar as dependências**
   ```bash
      npm install
   ```

3. **Configurar as Variáveis de Ambiente**
Crie um arquivo .env na raiz do projeto e insira o seu token de leitura da API do TMDB
   ```bash
      EXPO_PUBLIC_TMDB_TOKEN=seu_token_jwt_aqui
   ```

4. **Iniciar o servidor do Expo**
   ```bash
      npx expo start
   ```

---

## 📱 Visualização e Testes

No terminal gerado pelo Expo CLI, você poderá escolher o ambiente de renderização:

Pressione a para abrir no emulador Android.

Pressione i para abrir no simulador iOS.

Leia o QR Code exibido no terminal utilizando o aplicativo Expo Go em seu dispositivo físico.


* **Nota:** Para testar as requisições à API e sincronização nativa via Expo Go no celular físico, certifique-se de que o computador de desenvolvimento e o smartphone estejam conectados exatamente à mesma rede Wi-Fi.