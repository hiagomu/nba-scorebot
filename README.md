<div align="center">
    <img align="center" alt="scorebot logo" src="./public/scorebot-logo.png">
</div>
                    
## 📚 Sobre 

O projeto **NBA Scorebot** foi desenvolvido com intuito de tweetar os placares de jogos da NBA em tempo real, e também tem uma funcionalidade que mostra os resultados da partida logo quando finalizada. Futuramente contará com mais funcionalidades que não se limitaram apenas a partidas, também a estatítica dos jogadores e recordes históricos.
                    
Os formatos de tweets para alertar placar e resultado das partidas:
                    
<div align="center">
    <img align="center" alt="tweet models gamewin" src="./public/gamewin.png">
    <img align="center" alt="tweet models game" src="./public/game.png">
</div>

## 🚀 Tecnologias utilizadas

- NodeJS
- Twitter API v2

## 📋 Pré-requisitos

- **Node.js**: Você precisa do Node.js instalado para rodar o bot. Você pode baixar [aqui](https://nodejs.org/en/download).

- **Twitter**: Você precisa ter uma conta no twitter. Você pode criar uma [aqui](https://twitter.com/i/flow/signup).

- **Twitter developer**: Faça login na sua conta e aplique para obter uma conta de desenvolvedor. Você pode aplicar [aqui](https://developer.twitter.com/en/apply-for-access).

## ⏱ Iniciar projeto 

- Primeiramente, você precisa gerar as chaves necessárias para autenticar o acesso a API do Twitter, [aqui](https://developer.twitter.com/en/portal/dashboard).

- Clone o respositório e instale as dependências com os seguintes comandos:
```bash
# Clonar o repositório
$ git clone https://github.com/hiagomu/nba-scorebot.git

# Instalar as dependências
$ npm install

```
- Acesse o arquivo twitterClient.js.
<div align="center">
    <img align="center" alt="scorebot logo" src="./public/twitterconfig.png">
</div>
- Altere as chaves para as que você gerou e adicione aos campos.
- Por fim, inicie o bot com o seguinte comando:
```bash
# Iniciar o servidor
$ npm start

```

Obs.: Se for deixar o código em um repositório público, considere utilizar váriaveis de ambiente para o .gitignore não envia-lás.
---
[![Follow on Twitter](https://img.shields.io/twitter/follow/nbagamesbot?style=social)](https://twitter.com/nbagamesbot)
