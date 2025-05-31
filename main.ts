import { OAuth2Client } from "@cmd-johnson/oauth2-client";
import {Hono} from 'hono';
import {createSpotifyClient} from "./utils.ts"
const tokensDB = await Deno.openKv()

const spotifyClient = createSpotifyClient("user-read-private user-read-email playlist-read-private playlist-read-collaborative user-library-read")


const acg = spotifyClient.code;

console.log("spotifyClient", await acg.getAuthorizationUri());

const router = new Hono();

router.get("/login", async (ctx)=>{
	const res = ctx.res.redirect((await acg.getAuthorizationUri({disablePkce: true})).uri);
	console.log("res", res);

})


router.get("/callback", async (ctx)=>{
	const token = await acg.getToken(ctx.request.url);
	console.log("token", token);
	tokensDB.set(["token"], token, {expireIn: token.expiresIn*1000});
	ctx.res.redirect("/");
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
	const plj =  await playlists.json();
	return ctx.json(plj);
})


const cert = await Deno.readTextFile("./cert.pem");
const key = await Deno.readTextFile("./key.pem");

Deno.serve({ 
	port: 8080,
	cert,
	key
}, router.fetch);

