CREATE TABLE public.competition (
    competition_id character varying(255) NOT NULL,
    competition_code character varying(255),
    name character varying(255),
    sub_type character varying(255),
    type character varying(255),
    country_id integer,
    country_name character varying(255),
    domestic_league_code character varying(255),
    confederation character varying(255),
    url character varying(255)
);


CREATE TABLE public.games (
    game_id integer NOT NULL,
    competition_id character varying(255),
    season integer,
    round character varying(255),
    date date,
    home_club_id integer,
    away_club_id integer,
    home_club_goals integer,
    away_club_goals integer,
    home_club_position integer,
    away_club_position integer,
    home_club_manager_name character varying(255),
    away_club_manager_name character varying(255),
    stadium character varying(255),
    attendance integer,
    referee character varying(255),
    url character varying(255),
    home_club_formation character varying(255),
    away_club_formation character varying(255),
    home_club_name character varying(255),
    away_club_name character varying(255),
    aggregate character varying(255),
    competition_type character varying(255)
);



CREATE SEQUENCE public.games_game_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



CREATE TABLE public.player (
    player_id integer NOT NULL,
    first_name character varying(255),
    last_name character varying(255),
    name character varying(255),
    last_season integer,
    current_club_id integer,
    player_code character varying(255),
    country_of_birth character varying(255),
    city_of_birth character varying(255),
    country_of_citizenship character varying(255),
    date_of_birth date,
    sub_position character varying(255),
    "position" character varying(255),
    foot character varying(255),
    height_in_cm integer,
    market_value_in_eur integer,
    highest_market_value_in_eur integer,
    contract_expiration_date date,
    agent_name character varying(255),
    image_url character varying(255),
    url character varying(255),
    current_club_domestic_competition_id character varying(255),
    current_club_name character varying(255)
);



CREATE SEQUENCE public.player_player_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.player_player_id_seq OWNED BY public.player.player_id;
ALTER TABLE ONLY public.games ALTER COLUMN game_id SET DEFAULT nextval('public.games_game_id_seq'::regclass);
ALTER TABLE ONLY public.player ALTER COLUMN player_id SET DEFAULT nextval('public.player_player_id_seq'::regclass);
