import { Application, Router } from "@oak/oak";
import { OAuth2Client } from "@cmd-johnson/oauth2-client";

const tokensDB = await Deno.openKv()
const client_id = Deno.env.get("SPOTIFY_CLIENT_ID");
const secret_id = Deno.env.get("SPOTIFY_CLIENT_SECRET");

const spotifyClient = new OAuth2Client({
	clientId: client_id,
	clientSecret: secret_id,
	redirectUri: "https://127.0.0.1:8080/callback",
	authorizationEndpointUri: "https://accounts.spotify.com/authorize",
	tokenUri: "https://accounts.spotify.com/api/token",
	defaults : {
		scope: "user-read-private user-read-email playlist-read-private playlist-read-collaborative user-library-read"
	}

})

const acg = spotifyClient.code;

console.log("spotifyClient", await acg.getAuthorizationUri());

const router = new Router();

router.get("/login", async (ctx)=>{
	const res = ctx.response.redirect((await acg.getAuthorizationUri({disablePkce: true})).uri);
	console.log("res", res);

})


router.get("/callback", async (ctx)=>{
	const token = await acg.getToken(ctx.request.url);
	console.log("token", token);
	tokensDB.set(["token"], token, {expireIn: token.expiresIn*1000});
	ctx.response.redirect("/");
})

router.get("/", async (ctx)=>{
	console.log("tokens", await tokensDB.get(["token"]));
	const playlists = await fetch(
		"https://api.spotify.com/v1/me/tracks",
		{
			method: "GET",
			headers: {
				"Authorization": "Bearer "+(await tokensDB.get(["token"])).value.accessToken
			}
		}
	)
	console.log("AccessToken: ", (await tokensDB.get(["token"])).value.accessToken);
	console.log("playlists", await playlists.json());
})

const app = new Application();
app.use(router.routes());


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

