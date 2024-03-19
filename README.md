<h1 align="center"> Painel de Produto </h1>

# :hammer: Funcionalidades do projeto

- `Funcionalidade 1`: Consegue Adicionar Produtos
- `Funcionalidade 2`: Editar Produtos
- `Funcionalidade 3`: Deletar Produtos
- `Funcionalidade 4`: Atualizar Produtos

# 🛠️ Abrir e rodar o projeto

- `Passo 1`: Clone o projeto aonde desejar eu irei usar como exemplo a 'Área de Trabalho'
- `Passo 2`: Pelo terminal acesse a pasta clonada que tera o nome de 'painel-de-produto'
- `Passo 3`: Caso queira usar o banco de dados do nosso docker rode o comando **docker compose up -d**
- `Passo 4`: Após finalizar a operação acesse via terminal a pasta **/api** rode o comando **npm install** esse comando irá instalar todas as nossas dependências
- `Passo 5`: No mesmo terminal rode o comando **npm run migration:run** esse comando criará a tabela do banco de dados.
- `Passo 6`: Para finalizar acesse via terminal a pasta **/App** e rode o comando **npm run dev** inicializara nosso ambiente de dev pronto para uso e seus testes.

- `Passo Extra`: Caso deseje usar outro banco postgreSQL de sua preferência somente alterar o arquivo '.env' da pasta './api' ignorando o passo 3, porém seguindo os demais passos


<p>Acesse a rota do front realize e bom proveito</p>
<p>Caso ocorra algum erro na subida do docker solicitamos que limpe a memoria docker e confira para ver se a porta já não esteja sendo utilizada</p>

<p>Melhorias: responsividade, validação no form de adição de produto ou update do mesmo, mascara de dinheiro BRL na listagem de produtos, funcionalidade da barra de pesquisa ativada</p>
