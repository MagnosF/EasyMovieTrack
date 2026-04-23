export async function initializeDatabase(database) {
  try {
    // 1. Cria a tabela se ela não existir (para novos usuários/instalações)
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role TEXT DEFAULT 'comum',
        image TEXT,
        avatar_color TEXT DEFAULT '#00E5FF',
        avatar_icon TEXT DEFAULT 'weather-lightning'
      );
    `);

    // 2. MIGRATION: Adiciona colunas de avatar_color e avatar_icon para usuários existentes
    try {
      await database.execAsync("ALTER TABLE users ADD COLUMN avatar_color TEXT DEFAULT '#00E5FF';");
    } catch (e) {
      // Coluna já existe, ignora o erro
    }

    try {
      await database.execAsync("ALTER TABLE users ADD COLUMN avatar_icon TEXT DEFAULT 'weather-lightning';");
    } catch (e) {
      // Coluna já existe, ignora o erro
    }

    // 3. SEED: Cria um Admin padrão para testes da HU4
    await database.execAsync(`
      INSERT OR IGNORE INTO users (name, email, password, role, avatar_color, avatar_icon)
      VALUES ('Comandante', 'admin@adm.com', '123456', 'admin', '#00E5FF', 'weather-lightning');
    `);

    console.log("Banco de dados inicializado e atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao inicializar o banco:", error);
  }
}