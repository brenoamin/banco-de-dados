const conexao = require("../conexao");

const listarEmprestimos = async (req, res) => {
  try {
    const query = `select e.id, u.nome, u.telefone, u.email,l.nome as livro, e.status from usuarios u
    left join emprestimos e on e.usuario_id=u.id
    inner join livros l on l.id=e.livro_id`;
    const { rows: emprestimos } = await conexao.query(query);
    return res.status(200).json(emprestimos);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const obterEmprestimo = async (req, res) => {
  const { id } = req.params;
  try {
    const query = `select e.id, u.nome, u.telefone, u.email,l.nome as livro, e.status from usuarios u
    left join emprestimos e on e.usuario_id=u.id
    inner join livros l on l.id=e.livro_id
    WHERE e.id=$1`;
    const emprestimo = await conexao.query(query, [id]);
    if (emprestimo.rowCount === 0) {
      return res.status(404).json("Empréstimo não encontrado");
    }
    return res.status(200).json(emprestimo.rows[0]);
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const cadastrarEmprestimo = async (req, res) => {
  const { usuario_id, livro_id, status } = req.body;
  try {
    const query = `insert into emprestimos (usuario_id, livro_id, status)
        values ($1, $2, $3)`;
    const emprestimoCadastro = await conexao.query(query, [
      usuario_id,
      livro_id,
      status,
    ]);
    if (emprestimoCadastro.rowCount === 0) {
      return res.status(400).json("Não foi possível cadastrar o empréstimo");
    }
    res.status(200).json("O empréstimo foi cadastrado com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const atualizarEmprestimo = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  try {
    const emprestimo = await conexao.query(
      "SELECT * from emprestimos where id=$1",
      [id]
    );
    if (emprestimo.rowCount === 0) {
      return res.status(404).json("Empréstimo não encontrado");
    }
    const queryAtualizar = `UPDATE emprestimos SET  status=$1 WHERE id=$2`;
    const emprestimoAtualizado = await conexao.query(queryAtualizar, [
      status,
      id,
    ]);
    if (emprestimoAtualizado.rowCount === 0) {
      return res.status(404).json("Não foi possível atualizar o empréstimo");
    }
    res.status(200).json("O empréstimo foi atualizado com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};
const excluirEmprestimo = async (req, res) => {
  const { id } = req.params;
  try {
    const emprestimo = await conexao.query(
      "SELECT * from emprestimos where id=$1",
      [id]
    );
    if (emprestimo.rowCount === 0) {
      return res.status(404).json("Empréstimo não encontrado");
    }
    const queryDeletar = `DELETE from emprestimos where id= $1`;
    const emprestimoDeletado = await conexao.query(queryDeletar, [id]);
    if (emprestimoDeletado.rowCount === 0) {
      return res.status(404).json("Não foi possível deletar o empréstimo");
    }
    return res.status(200).json("O empréstimo foi deletado com sucesso");
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  listarEmprestimos,
  obterEmprestimo,
  atualizarEmprestimo,
  cadastrarEmprestimo,
  excluirEmprestimo,
};
