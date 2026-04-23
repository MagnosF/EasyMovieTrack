import { type SQLiteDatabase } from 'expo-sqlite';

export async function initializeDatabase(database: SQLiteDatabase) {
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
        avatar_color TEXT DEFAULT '#E50914',
        avatar_icon TEXT DEFAULT 'movie'
      );
    `);

    // 2. MIGRATION: Adiciona colunas de avatar_color e avatar_icon para usuários existentes
    // Usei blocos try/catch individuais porque se a coluna já existir, o SQLite dá erro.
    try {
      await database.execAsync("ALTER TABLE users ADD COLUMN avatar_color TEXT DEFAULT '#E50914';");
    } catch (e) {
      // Coluna já existe, ignora o erro
    }

    try {
      await database.execAsync("ALTER TABLE users ADD COLUMN avatar_icon TEXT DEFAULT 'movie';");
    } catch (e) {
      // Coluna já existe, ignora o erro
    }

    console.log("Banco de dados inicializado e atualizado com sucesso!");
  } catch (error) {
    console.error("Erro ao inicializar o banco:", error);
  }
}