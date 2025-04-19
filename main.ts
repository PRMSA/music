import { Application, Router } from "@oak/oak";
import { OAuth2Client } from "@cmd-johnson/oauth2-client";


const client_is = Deno.env.get("SPOTIFY_CLIENT_ID");
const secret_is = Deno.env.get("SPOTIFY_CLIENT_SECRET");



const app = new Application();
app.use(async (ctx, next) => {
	ctx.response.headers.set("Content-Type", "text/html");
	ctx.response.body = "<h1>Hello, World!</h1>";
});


app.addEventListener("listen", (ev) => {
	console.log(`${"https://"+ev.hostname+":"+ev.port}`);
})

const cert = await Deno.readTextFile("./cert.pem");
const key = await Deno.readTextFile("./key.pem");

app.listen({ 
	port: 8080,
	secure: true,
	cert,
	key
});

