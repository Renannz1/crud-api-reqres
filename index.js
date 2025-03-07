const express = require("express")
const axios = require("axios")
const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")
const urlBase = "https://reqres.in/api"

// Config
    const app = express()
    // Template Engine
        app.engine("handlebars", handlebars.engine())
        app.set("view engine", "handlebars")
    // Body Parser
        app.use(bodyParser.urlencoded({extended: false}))
        app.use(bodyParser.json())


// Rotas
    // Listar todos usuários
        app.get("/usuarios", async function(req, res){
            try {
                var response = await axios.get(urlBase+"/users")
                res.render("index", {users: response.data.data})
            } catch (error) {
                res.status(400).send("error: ", error.message)
            }
        })

    // Mostrar usuário por id
        app.get("/usuarios/:id", async function(req, res) {
            try {
                var response = await axios.get(urlBase+"/users/"+req.params.id)
                res.render("detail_usuario", {user: response.data.data})
            } catch (error) {
                res.status(400).send(error.message)
            }
        })

    // Carrega o formulário
        app.get("/usuario/form", function(req, res) {
            res.render("create_usuario")
        })

    // Recebe os dados do formulário (criar)
        app.post("/usuario/criar", async function(req, res){
            try {
                var response = await axios.post(urlBase+"/users", {
                    name: req.body.name,
                    job: req.body.job
                })
                console.log("usuario criado: ", response.data)
                res.render("created_usuario", {user: response.data})
            } catch (error) {
                res.status(400).send(error.message)
            }
        })

    // Carrega formulário para editar usuário
        app.get("/usuario/editar/:id", async function (req, res) {
            try {
                var response = await axios.get(urlBase + "/users/" + req.params.id)
                res.render("edit_usuario", { user: response.data.data })
            } catch (error) {
                res.status(400).send(error.message)
            }
        })

    // Recebe dados do formulário (editar)
        app.post("/usuario/atualizar/:id", async function (req, res) {
            try {
                var response = await axios.put(urlBase + "/users/" + req.params.id, {
                    name: req.body.name,
                    job: req.body.job
                });
                console.log("usuario atualizado:", response.data)
                res.render("edited_usuario", {user: response.data})
            } catch (error) {
                res.status(400).send(error.message)
            }
        })

    // Excluir usuário 
        app.get("/usuario/deletar/:id", async function (req, res) {
            try {
                await axios.delete(urlBase + "/users/" + req.params.id)
                console.log("usuario deletado:", req.params.id)
                res.redirect("/usuarios")
            } catch (error) {
                res.status(400).send(error.message)
            }
        })

// Rodando o Servidor
app.listen(3000, function(){
    console.log("servidor rodando em http://localhost:3000")
})