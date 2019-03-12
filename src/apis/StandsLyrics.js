// StandsLyrics.js
import request from 'superagent';
import config from './StandsLyricsConfig.js';

// mock api call
let body = {
    "result": [
        {
            "song": "66",
            "song-link": "https://www.lyrics.com/lyric/2367111",
            "artist": "The Afghan Whigs",
            "artist-link": "https://www.lyrics.com/artist/page/3509",
            "album": "1965",
            "album-link": "https://www.lyrics.com/album/379829"
        },
        {
            "song": "66",
            "song-link": "https://www.lyrics.com/lyric/34948751",
            "artist": "Lil Yachty",
            "artist-link": "https://www.lyrics.com/artist/page/3198663",
            "album": "Lil Boat 2",
            "album-link": "https://www.lyrics.com/album/3643481"
        }
    ]
};

// musicQuery: obj
// contains the song name and artist name for the lyrics we want to retrieve
const getLyricsLinks = async (musicQuery) => {

    const {ADMIN_PASS, BASE_URL, TOKEN, USER_ID} = config;

    return await request.get(BASE_URL)
        .query({ uid: USER_ID})
        .query({ tokenid: TOKEN })
        .query({ term: musicQuery.songName })
        .query({ format: "json" });
};

export default {
    ...config, // admin pass, token ID, user ID, base URL
    testResponse: body,
    getLyricsLinks
};