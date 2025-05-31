import {OAuth2Client} from '@cmd-johnson/oauth2-client';


export function createSpotifyClient(scopes: string) {

	const client_id = Deno.env.get("SPOTIFY_CLIENT_ID");
	const secret_id = Deno.env.get("SPOTIFY_CLIENTE_SECRET");
	const redirectUri = Deno.env.get("SPOTIFY_REDIRECT_URI") || "https://127.0.0.1:8080/callback";
	
	return new OAuth2Client({
		clientId: client_id,
		clientSecret: secret_id,
		redirectUri: redirectUri,
		authorizationEndpointUri: "https://accounts.spotify.com/authorize",
		tokenUri: "https://accounts.spotify.com/api/token",
		defaults: {
			scope: scopes
		}
	});
}
