# EasyMovieTrack - EPIC 1 🎬

<p align="center">
  <img src="https://img.shields.io/badge/React__Native-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React Native" />
  <img src="https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white" alt="Expo" />
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite" />
</p>

Este é o projeto de entrega da primeira etapa (**EPIC 1**) focado em gestão de utilizadores e persistência local.

**Desenvolvedor:** Magno Ferreira Santos  
**Disciplina:** Projeto Aplicado em Desenvolvimento de Sistemas  
**Tecnologias:** React Native, Expo, SQLite.

---

## 📌 Sobre o Projeto

O **EasyMovieTrack** é um aplicativo de gestão de filmes que permite o controle personalizado de perfis de utilizadores. Nesta primeira entrega, o foco foi a segurança do sistema, a persistência de dados local e a customização da interface pelo utilizador.

---

## 🚀 Funcionalidades (HUs)

- **HU1 & HU3 - Registo Seguro:** Validação de formulários com requisitos mínimos de segurança (palavras-passe com mais de 6 caracteres).
- **HU2 & HU5 - Personalização de Perfil:** Escolha de cores, ícones e integração com a galeria do dispositivo para foto de perfil usando [Expo Image Picker](https://docs.expo.dev/versions/latest/sdk/imagepicker/).
- **HU4 - Painel Administrativo:** Acesso restrito para visualização e gestão da lista de utilizadores registados.
- **Persistência Local:** Base de dados SQLite integrado para salvar as configurações de cada utilizador de forma individual.

---

## 🏗️ Arquitetura do Projeto

Estrutura do projeto:

```text
   EasyMovieTrack/
   ├── app/                  # Sistema de Rotas (Expo Router)
   │   ├── (tabs)/           # Movies, Profile (Navegação principal)
   │   ├── admin-users.js    # Gestão de utilizadores (Admin)
   │   ├── register.js       # Ecrã de registo
   │   ├── forgot-password.js # Recuperação de senha pelo Email
   │   └── index.js          # Ecrã de Login (Ponto de entrada)
   ├── src/
   │   ├── database/         # initializeDatabase.js (Configuração SQLite)
   │   └── styles/           # globalStyles.ts (Estilização global da app)
   ├── components/           # Componentes reutilizáveis
   ├── hooks/                # Hooks de lógica de estado
   └── constants/            # Constantes de design e cores
```

---

## 📦 Get started

Siga os passos abaixo para configurar o ambiente e executar o projeto localmente:

1. **Clonar o repositório**
   ```bash
      git clone [https://github.com/MagnosF/EasyMovieTrack.git](https://github.com/MagnosF/EasyMovieTrack.git)
   ```
      
2. **Instalar as dependências**
   ```bash
      npm install
   ```

3. **Iniciar o servidor do Expo**
   ```bash
      npx expo start
   ```

---

## 📱 Visualização

No terminal, você encontrará opções para abrir o app em:

Android emulator

iOS simulator

Expo Go, lendo o QR Code com a câmera do seu dispositivo.

Nota: Certifique-se de que o computador e o celular estejam na mesma rede Wi-Fi para o funcionamento do Expo Go.