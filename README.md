Pequeno projeto usando oak, oauth2-client e spotify-web-api

# Por que?
- Para estudar oak
- Para estudar oauth2-client
- E melhorar minhas playlists

# O que espero aprender?
- Como autenticar um usuário usando oauth2
- Compreender como funciona o oak


No início do projeto ao ler a biblioteca de oauth2 que escolhi percebi que terei que gerenciar sessões de usuários e escolhi deno kv.

Também tive que aprender sobre como configurar tarefas repetitivas como: start, test, lint.

Lembrei que vou ter que aprender a também criar certificados para disponibilizar uma conexão https e verei se é possível repassar os certificados com algum comando deno.
- O deno tem um comando --cert para passar certifcados autoassinados e não bloquear o acesso no caso de requisições para um servidor.
- para criar uma chave é só usar o seguinte comando: `openssl genrsa -out key.pem 2048`
- como usei ia para criar os certificados não entendi muito, deverei estudar mais sobre o openssl e sobre certificados.

