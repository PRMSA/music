import { z } from 'npm:zod'

const API_BASE_URL = 'https://api.spotify.com/v1';
const API_TRACKS_GENERAL = `${API_BASE_URL}/tracks`;
const API_TRACKS_ME = `${API_BASE_URL}/me/tracks`;

const QueryMyTracks = z.object({
	market: z.string().default(''),
	limit: z.number().max(50).default(50).transform(val=>val+''),
	offset: z.number().default(0).transform(val=>val+'')
});
type QueryMyTracks = z.infer<typeof QueryMyTracks>;

export function getMyTracks(token: string, q: QueryMyTracks = QueryMyTracks.parse({})) {
	const req = new Request(API_TRACKS_ME+"?"+(new URLSearchParams(q))+'', {
		headers: {
			Authorization: `Bearer ${token}`
		},
		method: 'GET',
	})

	return req;
}


const a = QueryMyTracks.parse({
});

console.log((getMyTracks('', a)));
