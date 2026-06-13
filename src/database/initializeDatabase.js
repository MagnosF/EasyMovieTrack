export async function initializeDatabase(database) {
  try {
    // 🎬 CRIAR TABELA DE FILMES
    await database.execAsync(`
      CREATE TABLE IF NOT EXISTS movies (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        overview TEXT,
        poster_path TEXT,
        release_date TEXT
      );
    `);

    // 1. Cria a tabela de usuários se ela não existir
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

    // 2. MIGRATIONS DE SEGURANÇA: Garante as colunas para quem tem o banco antigo
    try {
      await database.execAsync("ALTER TABLE users ADD COLUMN avatar_color TEXT DEFAULT '#00E5FF';");
    } catch (e) {}

    try {
      await database.execAsync("ALTER TABLE users ADD COLUMN avatar_icon TEXT DEFAULT 'weather-lightning';");
    } catch (e) {}

    try {
      await database.execAsync("ALTER TABLE users ADD COLUMN image TEXT;");
    } catch (e) {}

    // 3. SEED: Insere o admin se ele não existir no sistema
    await database.execAsync(`
      INSERT OR IGNORE INTO users (name, email, password, role, avatar_color, avatar_icon)
      VALUES ('Comandante', 'admin@adm.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', 'admin', '#00E5FF', 'weather-lightning');
    `);

    // =========================================================================
    // 4. MIGRATION DE SEGURANÇA: Força o hash da senha do admin se necessário
    // =========================================================================
    const versionResult = await database.getFirstAsync('PRAGMA user_version;');
    const currentVersion = versionResult ? versionResult.user_version : 0;

    if (currentVersion < 1) {
      console.log("Detectado banco antigo ou desatualizado. Forçando hash do Admin...");
      
      await database.execAsync(`
        UPDATE users 
        SET password = '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92' 
        WHERE email = 'admin@adm.com';
      `);

      await database.execAsync('PRAGMA user_version = 1;');
      console.log("Banco de dados atualizado com sucesso para a versão 1!");
    }

  } catch (error) {
    console.error("Erro ao inicializar o banco:", error);
  }
}