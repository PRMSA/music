Pequeno projeto usando oak, oauth2-client e spotify-web-api

# Por que?
- Para estudar oak
- Para estudar oauth2-client
- E melhorar minhas playlists

# O que espero aprender?
- Como autenticar um usuário usando oauth2
- Compreender como funciona o oak
---

No início do projeto ao ler a biblioteca de oauth2 que escolhi percebi que terei que gerenciar sessões de usuários e escolhi deno kv.

Também tive que aprender sobre como configurar tarefas repetitivas como: start, test, lint.

Lembrei que vou ter que aprender a também criar certificados para disponibilizar uma conexão https e verei se é possível repassar os certificados com algum comando deno.
- O deno tem um comando --cert para passar certifcados autoassinados e não bloquear o acesso no caso de requisições para um servidor.
- para criar uma chave é só usar o seguinte comando: `openssl genrsa -out key.pem 2048`
- como usei ia para criar os certificados não entendi muito, deverei estudar mais sobre o openssl e sobre certificados.

Terei que me aprofundar um pouco no ssh-keygen já que estou tentando o utilizar para facilitar a autenticação do github.


## O que tem no Context do oak?
  Informações sobre estados, requisições, respostas, websockets e cookies além de informações sobre o app(oak).


## Estrutura pensada até agora(30/04/25)
- Criar funções/classe para genreciar a autenticação do spotify, a atualização dos tokens e o banco de dados que salva os tokens. 
> [!important]
> Estudar como o deno kv salva os dados e se separa os usuarios de forma automática

- Criar funções/classe para gerenciar a api do spotify, nesse primeiro momento apenas em relação ao endpoint track
> [!important]
> Estudar o que é um endpoint e termos relacionados a REST e se o spotify usa realmente REST

- Criar funções/classes utilitárias para facilitar a representações dos dados seja no console ou em uma ui/html
> [!important]
> Estudar MVC??? Ou algo parecido?
