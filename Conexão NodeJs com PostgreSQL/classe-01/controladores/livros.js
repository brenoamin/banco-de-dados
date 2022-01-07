const conexao = require("../conexao");

const listarLivros = async (req, res) => {
  try {
    const query = `
      select l.id, a.nome as nome_autor, l.nome, l.genero, l.editora, l.data_publicacao from livros l 
      left join autores a on l.autor_id=a.id
      `;
    const { rows: livros } = await conexao.query(query);
    return res.status(200).json(livros);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const obterLivro = async (req, res) => {
  const { id } = req.params;
  try {
    const livro = await conexao.query("SELECT * from livros WHERE id=$1", [id]);
    if (livro.rowCount === 0) {
      return res.status(404).json("Livro não encontrado");
    }
    return res.status(200).json(autor.rows[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const cadastrarLivro = async (req, res) => {
  const { autor_id, nome, genero, editora, data_publicacao } = req.body;
  try {
    const query = `INSERT INTO livros (autor_id, nome, genero, editora, data_publicacao) 
    values ($1, $2, $3, $4, $5)`;
    const livroCadastro = await conexao.query(query, [
      autor_id,
      nome,
      genero,
      editora,
      data_publicacao,
    ]);
    if (livroCadastro.rowCount === 0) {
      return res.status(400).json("Não foi possível cadastrar o livro");
    }
    res.status(200).json("Livro cadastrado com sucesso!");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const atualizarLivro = async (req, res) => {
  const { id } = req.params;
  const { autor_id, nome, genero, editora, data_publicacao } = req.body;
  const livro = await conexao.query("SELECT * from livros WHERE id=$1", [id]);
  try {
    if (livro.rowCount === 0) {
      return res.status(404).json("Livro não encontrado");
    }
    const queryAtualizar =
      "UPDATE livros SET autor_id= $1, nome= $2, genero= $3, editora= $4, data_publicacao= $5 WHERE id=$6";
    const livroAtualizado = await conexao.query(queryAtualizar, [
      autor_id,
      nome,
      genero,
      editora,
      data_publicacao,
      id,
    ]);
    if (livroAtualizado.rowCount === 0) {
      return res.status(404).json("Não foi possível atualizar o livro");
    }
    return res.status(200).json("O livro foi atualizado com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const excluirLivro = async (req, res) => {
  const { id } = req.params;
  try {
    const livro = await conexao.query("SELECT * from livros WHERE id=$1", [id]);
    if (livro.rowCount === 0) {
      return res.status(404).json("Livro não encontrado");
    }
    const queryDeletar = "DELETE from livros WHERE id= $1";
    const livroDeletado = await conexao.query(queryDeletar, [id]);
    const { rows: emprestimos } = await conexao.query(
      "select * from emprestimos where livro_id=$1",
      [id]
    );
    if (emprestimos.length) {
      return res
        .status(400)
        .json(
          "O livro possui um registro de empréstimo. Espere o livro ser devolvido antes de excluí-lo!"
        );
    }
    if (livroDeletado.rowCount === 0) {
      return res.status(404).json("Não foi possível deletar o livro");
    }
    return res.status(200).json("O livro foi deletado com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
module.exports = {
  listarLivros,
  obterLivro,
  cadastrarLivro,
  atualizarLivro,
  excluirLivro,
};
