const conexao = require("../conexao");

const listarAutores = async (req, res) => {
  try {
    const { rows: autores } = await conexao.query("select * from autores");
    for (const autor of autores) {
      const { rows: livros } = await conexao.query(
        "select * from livros where autor_id=$1",
        [autor.id]
      );
      autor.livros = livros;
    }
    res.status(200).json(autores);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const obterAutor = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "select * from autores where id =$1";
    const autor = await conexao.query(query, [id]);
    if (autor.rowCount === 0) {
      return res.status(400).json("Autor não encontrado");
    }
    res.status(200).json(autor.rows[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const cadastrarAutor = async (req, res) => {
  const { nome, idade } = req.body;
  if (!nome) {
    return res.status(400).json("O campo nome é obrigatório");
  }
  try {
    const query = "INSERT INTO autores (nome,idade) VALUES ($1,$2)";
    const autor = await conexao.query(query, [nome, idade]);
    if (autor.rowCount === 0) {
      return res.status(400).json("Não foi possível cadastrar o autor");
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
  return res.status(200).json("Autor cadastrado com sucesso");
};

const atualizarAutor = async (req, res) => {
  const { id } = req.params;
  const { nome, idade } = req.body;
  try {
    const query = "select * from autores where id =$1";
    const autor = await conexao.query(query, [id]);
    if (autor.rowCount === 0) {
      return res.status(400).json("Autor não encontrado");
    }
    if (!nome) {
      return res.status(400).json("O campo nome é obrigatório");
    }
    const queryAtualizar =
      "UPDATE autores SET nome =$1, idade =$2 where id =$3";
    const autorAtualizado = await conexao.query(queryAtualizar, [
      nome,
      idade,
      id,
    ]);
    if (autorAtualizado.rowCount === 0) {
      return res.status(404).json("Não foi possível atualizar o autor");
    }
    res.status(200).json("Autor atualizado com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const excluirAutor = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "select * from autores where id =$1";
    const autor = await conexao.query(query, [id]);
    if (autor.rowCount === 0) {
      return res.status(400).json("Autor não encontrado");
    }
    const { rows: livros } = await conexao.query(
      "select * from livros where autor_id=$1",
      [id]
    );
    if (livros.length) {
      return res
        .status(400)
        .json(
          "O autor possui um livro em seu nome. Exclua o livro associado a esse autor antes!"
        );
    }
    const queryDeletar = "DELETE FROM autores WHERE id=$1";
    const autorExcluido = await conexao.query(queryDeletar, [id]);
    if (autorExcluido.rowCount === 0) {
      return res.status(404).json("Não foi possível deletar o autor");
    }
    res.status(200).json("Autor foi excluído com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
module.exports = {
  listarAutores,
  obterAutor,
  cadastrarAutor,
  atualizarAutor,
  excluirAutor,
};
