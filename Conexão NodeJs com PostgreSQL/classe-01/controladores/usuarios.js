const conexao = require("../conexao");

const listarUsuarios = async (req, res) => {
  try {
    const { rows: usuarios } = await conexao.query("select * from usuarios");
    for (const usuario of usuarios) {
      const { rows: emprestimos } = await conexao.query(
        "select * from emprestimos where usuario_id=$1",
        [usuario.id]
      );
      usuario.emprestimos = emprestimos;
    }
    return res.status(200).json(usuarios);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const obterUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "select * from usuarios where id =$1";
    const usuario = await conexao.query(query, [id]);
    if (usuario.rowCount === 0) {
      return res.status(404).json("Usuário não encontrado");
    }
    const { rows: emprestimos } = await conexao.query(
      "select * from emprestimos where usuario_id=$1",
      [id]
    );
    usuario.emprestimos = emprestimos;

    return res.status(200).json(usuario.emprestimos.concat(usuario.rows[0]));
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const cadastrarUsuario = async (req, res) => {
  const { nome, idade, email, telefone, cpf } = req.body;
  try {
    const query = `INSERT INTO usuarios (nome, idade, email, telefone, cpf)
      values ($1, $2, $3, $4, $5)`;
    const usuarioCadastrado = await conexao.query(query, [
      nome,
      idade,
      email,
      telefone,
      cpf,
    ]);
    if (usuarioCadastrado.rowCount === 0) {
      return res.status(400).json("Não foi possível cadastrar o usuario");
    }
    return res.status(200).json("Usuário cadastrado com sucesso.");
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const atualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nome, idade, email, telefone, cpf } = req.body;
  try {
    const query = "select * from usuarios where id =$1";
    const usuario = await conexao.query(query, [id]);
    if (usuario.rowCount === 0) {
      return res.status(404).json("Usuário não encontrado");
    }
    const queryAtualizar =
      "UPDATE usuarios SET nome= $1, idade= $2, email= $3, telefone=$4, cpf= $5 where id= $6 ";
    const usuarioAtualizado = await conexao.query(queryAtualizar, [
      nome,
      idade,
      email,
      telefone,
      cpf,
      id,
    ]);
    if (usuarioAtualizado.rowCount === 0) {
      return res.status(404).json("Não foi possivel atualizar o usuário");
    }
    return res.status(200).json("O usuário foi atualizado com sucesso");
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const excluirUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const query = "select * from usuarios where id =$1";
    const usuario = await conexao.query(query, [id]);
    if (usuario.rowCount === 0) {
      return res.status(404).json("Usuário não encontrado");
    }
    const { rows: emprestimos } = await conexao.query(
      "select * from emprestimos where usuario_id=$1",
      [id]
    );
    if (emprestimos.length) {
      return res
        .status(400)
        .json(
          "O usuário possui um empréstimo, devolva o livro antes de excluí-lo do banco de dados!"
        );
    }
    const queryDeletar = "DELETE from usuarios where id=$1";
    const usuarioDeletado = await conexao.query(queryDeletar, [id]);
    if (usuarioDeletado.rowCount === 0) {
      return res.status(404).json("Não foi possível deletar o usuário");
    }
    return res.status(200).json("O usuário foi deletado com sucesso");
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = {
  listarUsuarios,
  obterUsuario,
  cadastrarUsuario,
  atualizarUsuario,
  excluirUsuario,
};
