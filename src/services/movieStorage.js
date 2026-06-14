/**
 * Salva as informações gerais do filme na tabela 'movies' para servir de cache local
 */
async function saveMovieCache(database, movie) {
  try {
    await database.runAsync(
      `INSERT OR IGNORE INTO movies (id, title, overview, poster_path, release_date) 
       VALUES (?, ?, ?, ?, ?);`,
      [movie.id, movie.title, movie.overview, movie.poster_path, movie.release_date]
    );
  } catch (error) {
    console.error("Erro ao salvar cache do filme:", error);
  }
}

/**
 * 7️⃣ Adiciona ou remove um filme da lista de assistidos do usuário (Toggle)
 * Retorna true se o filme passou a ser assistido, ou false se foi removido.
 */
export async function toggleWatchedMovie(database, userId, movie) {
  try {
    // 1. Primeiro garante que os dados estáticos do filme existem no banco
    await saveMovieCache(database, movie);

    // 2. Verifica se o usuário já marcou esse filme antes
    const row = await database.getFirstAsync(
      "SELECT * FROM user_movies WHERE user_id = ? AND movie_id = ?;",
      [userId, movie.id]
    );

    if (row) {
      // Se já existia, o usuário clicou de novo para "desmarcar". Então deletamos.
      await database.runAsync(
        "DELETE FROM user_movies WHERE user_id = ? AND movie_id = ?;",
        [userId, movie.id]
      );
      return false; // Agora não está mais assistido
    } else {
      // Se não existia, inserimos um novo registro de assistido
      await database.runAsync(
        "INSERT INTO user_movies (user_id, movie_id, watched) VALUES (?, ?, 1);",
        [userId, movie.id]
      );
      return true; // Agora está assistido!
    }
  } catch (error) {
    console.error("Erro ao alternar status de assistido:", error);
    throw error;
  }
}

/**
 * 🔍 Verifica se um filme específico já foi marcado como assistido por aquele usuário
 */
export async function isMovieWatched(database, userId, movieId) {
  try {
    const row = await database.getFirstAsync(
      "SELECT watched FROM user_movies WHERE user_id = ? AND movie_id = ?;",
      [userId, movieId]
    );
    // Se achou o registro e o campo 'watched' for 1, retorna true. Caso contrário, false.
    return row?.watched === 1;
  } catch (error) {
    console.error("Erro ao verificar se filme foi assistido:", error);
    return false;
  }
}