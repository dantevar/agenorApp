--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: cleaning_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cleaning_logs (
    pool_id integer NOT NULL,
    cleaning_time timestamp without time zone NOT NULL,
    cleaned_area character varying(255),
    cleaner character varying(255)
);


ALTER TABLE public.cleaning_logs OWNER TO postgres;

--
-- Name: filters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.filters (
    filter_id integer NOT NULL,
    object_id integer NOT NULL,
    filter_name character varying(255)
);


ALTER TABLE public.filters OWNER TO postgres;

--
-- Name: filters_filter_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.filters_filter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.filters_filter_id_seq OWNER TO postgres;

--
-- Name: filters_filter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.filters_filter_id_seq OWNED BY public.filters.filter_id;


--
-- Name: objects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.objects (
    object_id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.objects OWNER TO postgres;

--
-- Name: objects_object_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.objects_object_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.objects_object_id_seq OWNER TO postgres;

--
-- Name: objects_object_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.objects_object_id_seq OWNED BY public.objects.object_id;


--
-- Name: pool_filter_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pool_filter_logs (
    filter_id integer NOT NULL,
    log_date date NOT NULL,
    note character varying(255),
    operator character varying(255)
);


ALTER TABLE public.pool_filter_logs OWNER TO postgres;

--
-- Name: pool_visits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pool_visits (
    pool_id integer NOT NULL,
    date_of_visit date NOT NULL,
    n_visitors integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.pool_visits OWNER TO postgres;

--
-- Name: pools; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pools (
    pool_id integer NOT NULL,
    object_id integer NOT NULL,
    pool_name character varying(255),
    pool_capacity integer
);


ALTER TABLE public.pools OWNER TO postgres;

--
-- Name: pools_pool_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.pools_pool_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.pools_pool_id_seq OWNER TO postgres;

--
-- Name: pools_pool_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pools_pool_id_seq OWNED BY public.pools.pool_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(50),
    user_group character varying(50)
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: water_additions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.water_additions (
    pool_id integer NOT NULL,
    date_of_water_addition date NOT NULL,
    capacity integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.water_additions OWNER TO postgres;

--
-- Name: filters filter_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filters ALTER COLUMN filter_id SET DEFAULT nextval('public.filters_filter_id_seq'::regclass);


--
-- Name: objects object_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.objects ALTER COLUMN object_id SET DEFAULT nextval('public.objects_object_id_seq'::regclass);


--
-- Name: pools pool_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pools ALTER COLUMN pool_id SET DEFAULT nextval('public.pools_pool_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: cleaning_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cleaning_logs (pool_id, cleaning_time, cleaned_area, cleaner) FROM stdin;
1	2025-08-01 10:12:30.187239	podovi	ja
2	2025-07-01 13:13:00	YOLO	Skakač
3	2025-08-01 13:16:00	Mlinarova sauna	Pekar
3	2025-08-01 15:17:00	Ne da mi se čistiti	Nitko
1	2025-08-01 15:21:53.879769	niko	kovac
3	2025-08-01 15:29:00	Agenor	McDonalds zaposlenica
2	2025-08-01 15:30:00	Cetina je jedina voda	Majka
1	2025-08-06 10:15:00	na	ds
\.


--
-- Data for Name: filters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.filters (filter_id, object_id, filter_name) FROM stdin;
1	1	prvi_filter
\.


--
-- Data for Name: objects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.objects (object_id, name) FROM stdin;
1	aquapark
2	kupaliste
\.


--
-- Data for Name: pool_filter_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pool_filter_logs (filter_id, log_date, note, operator) FROM stdin;
1	2025-08-01	ovo je note	ja
\.


--
-- Data for Name: pool_visits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pool_visits (pool_id, date_of_visit, n_visitors) FROM stdin;
1	2025-08-01	12
1	2025-07-31	33
\.


--
-- Data for Name: pools; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pools (pool_id, object_id, pool_name, pool_capacity) FROM stdin;
1	1	bazen_prvi	100
2	1	tobogan_crveni	100
3	1	tobogan_zeleni	100
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, phone, user_group) FROM stdin;
1	mmm@hotmail.com	a	0981111122	C
\.


--
-- Data for Name: water_additions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.water_additions (pool_id, date_of_water_addition, capacity) FROM stdin;
2	2025-08-01	23
\.


--
-- Name: filters_filter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.filters_filter_id_seq', 1, true);


--
-- Name: objects_object_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.objects_object_id_seq', 2, true);


--
-- Name: pools_pool_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pools_pool_id_seq', 3, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: cleaning_logs cleaning_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cleaning_logs
    ADD CONSTRAINT cleaning_logs_pkey PRIMARY KEY (pool_id, cleaning_time);


--
-- Name: filters filters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filters
    ADD CONSTRAINT filters_pkey PRIMARY KEY (filter_id);


--
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (object_id);


--
-- Name: pool_visits pk_pool_date; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pool_visits
    ADD CONSTRAINT pk_pool_date PRIMARY KEY (pool_id, date_of_visit);


--
-- Name: pool_filter_logs pool_filter_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pool_filter_logs
    ADD CONSTRAINT pool_filter_logs_pkey PRIMARY KEY (filter_id, log_date);


--
-- Name: pools pools_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pools
    ADD CONSTRAINT pools_pkey PRIMARY KEY (pool_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: water_additions water_additions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.water_additions
    ADD CONSTRAINT water_additions_pkey PRIMARY KEY (pool_id, date_of_water_addition);


--
-- Name: filters filters_object_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filters
    ADD CONSTRAINT filters_object_id_fkey FOREIGN KEY (object_id) REFERENCES public.objects(object_id) ON DELETE CASCADE;


--
-- Name: pools fk_object; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pools
    ADD CONSTRAINT fk_object FOREIGN KEY (object_id) REFERENCES public.objects(object_id) ON DELETE CASCADE;


--
-- Name: cleaning_logs fk_pool; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cleaning_logs
    ADD CONSTRAINT fk_pool FOREIGN KEY (pool_id) REFERENCES public.pools(pool_id) ON DELETE CASCADE;


--
-- Name: pool_visits fk_pool; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pool_visits
    ADD CONSTRAINT fk_pool FOREIGN KEY (pool_id) REFERENCES public.pools(pool_id) ON DELETE CASCADE;


--
-- Name: pool_filter_logs pool_filter_logs_filter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pool_filter_logs
    ADD CONSTRAINT pool_filter_logs_filter_id_fkey FOREIGN KEY (filter_id) REFERENCES public.filters(filter_id) ON DELETE CASCADE;


--
-- Name: water_additions water_additions_pool_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.water_additions
    ADD CONSTRAINT water_additions_pool_id_fkey FOREIGN KEY (pool_id) REFERENCES public.pools(pool_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

