const Constant = {
    BASE_URL: 'http://192.168.1.61:9090/api',
    API_URL: {
        SIGN_UP: '/auth/signup',
        SIGN_IN: '/auth/signin',
        REFRESH_TOKEN: '/auth/refreshtoken',
        FIND_ALL_SHOW: '/movie/admin/find-all-show',
        ROOM_FIND: '/room/find',
        MOVIE_FIND: '/movie/find-movie-has-ticket',
    },
    SHOW: {
        ROOM_COLOR: {
            R01: "#e986b0",
            R02: "#E8187C",
            R03: "#41B3A3",
            R04: "#98a0ea",
            R05: "#c7c763"
        }
    }
};

export default Constant;
