const express = require("express");
const rotas = express();
const usuarios = require("./controladores/usuarios");
const pokemons = require("./controladores/pokemons");
//usuarios
rotas.post("/usuarios", usuarios.cadastrarUsuario);
rotas.post("/login", usuarios.login);

//pokemons
rotas.get("/pokemons", pokemons.listarPokemons);
rotas.get("/pokemons/:id", pokemons.obterPokemon);
rotas.post("/pokemons", pokemons.cadastrarPokemon);
rotas.put("/pokemons/:id", pokemons.atualizarPokemon);
rotas.delete("/pokemons:id", pokemons.excluirPokemon);
module.exports = rotas;
