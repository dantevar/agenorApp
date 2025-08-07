--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-08-07 11:14:37

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

--
-- TOC entry 881 (class 1247 OID 16646)
-- Name: area_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.area_type AS ENUM (
    'C',
    'N'
);


ALTER TYPE public.area_type OWNER TO postgres;

--
-- TOC entry 884 (class 1247 OID 16661)
-- Name: water; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.water AS ENUM (
    'FRESH',
    'SEA',
    'MIX'
);


ALTER TYPE public.water OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 217 (class 1259 OID 16552)
-- Name: cleaning_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cleaning_logs (
    pool_id integer NOT NULL,
    cleaning_time timestamp without time zone NOT NULL,
    cleaned_area public.area_type,
    cleaner character varying(255),
    approved boolean DEFAULT false NOT NULL
);


ALTER TABLE public.cleaning_logs OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 16557)
-- Name: filters; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.filters (
    filter_id integer NOT NULL,
    object_id integer NOT NULL,
    filter_name character varying(255)
);


ALTER TABLE public.filters OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16560)
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
-- TOC entry 4974 (class 0 OID 0)
-- Dependencies: 219
-- Name: filters_filter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.filters_filter_id_seq OWNED BY public.filters.filter_id;


--
-- TOC entry 220 (class 1259 OID 16561)
-- Name: objects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.objects (
    object_id integer NOT NULL,
    name character varying(255) NOT NULL
);


ALTER TABLE public.objects OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16564)
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
-- TOC entry 4975 (class 0 OID 0)
-- Dependencies: 221
-- Name: objects_object_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.objects_object_id_seq OWNED BY public.objects.object_id;


--
-- TOC entry 222 (class 1259 OID 16565)
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
-- TOC entry 223 (class 1259 OID 16570)
-- Name: pool_visits; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pool_visits (
    pool_id integer NOT NULL,
    visit_date date NOT NULL,
    n_visitors integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.pool_visits OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16574)
-- Name: pools; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.pools (
    pool_id integer NOT NULL,
    object_id integer NOT NULL,
    pool_name character varying(255),
    pool_capacity integer,
    water_type public.water DEFAULT 'FRESH'::public.water NOT NULL,
    is_spa boolean DEFAULT false NOT NULL
);


ALTER TABLE public.pools OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16577)
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
-- TOC entry 4976 (class 0 OID 0)
-- Dependencies: 225
-- Name: pools_pool_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pools_pool_id_seq OWNED BY public.pools.pool_id;


--
-- TOC entry 226 (class 1259 OID 16578)
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
-- TOC entry 227 (class 1259 OID 16583)
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
-- TOC entry 4977 (class 0 OID 0)
-- Dependencies: 227
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 228 (class 1259 OID 16584)
-- Name: water_additions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.water_additions (
    pool_id integer NOT NULL,
    addition_date date NOT NULL,
    capacity double precision DEFAULT 0 NOT NULL
);


ALTER TABLE public.water_additions OWNER TO postgres;

--
-- TOC entry 4780 (class 2604 OID 16588)
-- Name: filters filter_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filters ALTER COLUMN filter_id SET DEFAULT nextval('public.filters_filter_id_seq'::regclass);


--
-- TOC entry 4781 (class 2604 OID 16589)
-- Name: objects object_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.objects ALTER COLUMN object_id SET DEFAULT nextval('public.objects_object_id_seq'::regclass);


--
-- TOC entry 4783 (class 2604 OID 16590)
-- Name: pools pool_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pools ALTER COLUMN pool_id SET DEFAULT nextval('public.pools_pool_id_seq'::regclass);


--
-- TOC entry 4786 (class 2604 OID 16591)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4957 (class 0 OID 16552)
-- Dependencies: 217
-- Data for Name: cleaning_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cleaning_logs (pool_id, cleaning_time, cleaned_area, cleaner, approved) FROM stdin;
1	2025-08-07 14:30:00	C	guy1	f
1	2025-08-06 11:30:00	C	guy1	f
1	2025-08-02 15:34:00	N	woman	f
2	2025-08-02 15:34:00	N	woman	f
2	2025-08-01 19:34:00	N	woman	f
2	2025-08-04 17:36:06	C	man	f
\.


--
-- TOC entry 4958 (class 0 OID 16557)
-- Dependencies: 218
-- Data for Name: filters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.filters (filter_id, object_id, filter_name) FROM stdin;
1	1	prvi_filter
\.


--
-- TOC entry 4960 (class 0 OID 16561)
-- Dependencies: 220
-- Data for Name: objects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.objects (object_id, name) FROM stdin;
1	aquapark
2	kupaliste
\.


--
-- TOC entry 4962 (class 0 OID 16565)
-- Dependencies: 222
-- Data for Name: pool_filter_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pool_filter_logs (filter_id, log_date, note, operator) FROM stdin;
1	2025-08-01	ovo je note	ja
\.


--
-- TOC entry 4963 (class 0 OID 16570)
-- Dependencies: 223
-- Data for Name: pool_visits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pool_visits (pool_id, visit_date, n_visitors) FROM stdin;
1	2025-08-01	12
1	2025-07-31	33
\.


--
-- TOC entry 4964 (class 0 OID 16574)
-- Dependencies: 224
-- Data for Name: pools; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pools (pool_id, object_id, pool_name, pool_capacity, water_type, is_spa) FROM stdin;
1	1	bazen_prvi	100	FRESH	f
2	1	tobogan_crveni	100	FRESH	f
3	1	tobogan_zeleni	100	FRESH	f
\.


--
-- TOC entry 4966 (class 0 OID 16578)
-- Dependencies: 226
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, phone, user_group) FROM stdin;
1	mmm@hotmail.com	a	0981111122	C
\.


--
-- TOC entry 4968 (class 0 OID 16584)
-- Dependencies: 228
-- Data for Name: water_additions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.water_additions (pool_id, addition_date, capacity) FROM stdin;
2	2025-08-01	23
1	2025-08-02	0.342
\.


--
-- TOC entry 4978 (class 0 OID 0)
-- Dependencies: 219
-- Name: filters_filter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.filters_filter_id_seq', 1, true);


--
-- TOC entry 4979 (class 0 OID 0)
-- Dependencies: 221
-- Name: objects_object_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.objects_object_id_seq', 2, true);


--
-- TOC entry 4980 (class 0 OID 0)
-- Dependencies: 225
-- Name: pools_pool_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pools_pool_id_seq', 3, true);


--
-- TOC entry 4981 (class 0 OID 0)
-- Dependencies: 227
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- TOC entry 4789 (class 2606 OID 16593)
-- Name: cleaning_logs cleaning_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cleaning_logs
    ADD CONSTRAINT cleaning_logs_pkey PRIMARY KEY (pool_id, cleaning_time);


--
-- TOC entry 4791 (class 2606 OID 16595)
-- Name: filters filters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filters
    ADD CONSTRAINT filters_pkey PRIMARY KEY (filter_id);


--
-- TOC entry 4793 (class 2606 OID 16597)
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (object_id);


--
-- TOC entry 4797 (class 2606 OID 16599)
-- Name: pool_visits pk_pool_date; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pool_visits
    ADD CONSTRAINT pk_pool_date PRIMARY KEY (pool_id, visit_date);


--
-- TOC entry 4795 (class 2606 OID 16601)
-- Name: pool_filter_logs pool_filter_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pool_filter_logs
    ADD CONSTRAINT pool_filter_logs_pkey PRIMARY KEY (filter_id, log_date);


--
-- TOC entry 4799 (class 2606 OID 16603)
-- Name: pools pools_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pools
    ADD CONSTRAINT pools_pkey PRIMARY KEY (pool_id);


--
-- TOC entry 4801 (class 2606 OID 16605)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4803 (class 2606 OID 16607)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4805 (class 2606 OID 16609)
-- Name: water_additions water_additions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.water_additions
    ADD CONSTRAINT water_additions_pkey PRIMARY KEY (pool_id, addition_date);


--
-- TOC entry 4807 (class 2606 OID 16610)
-- Name: filters filters_object_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filters
    ADD CONSTRAINT filters_object_id_fkey FOREIGN KEY (object_id) REFERENCES public.objects(object_id) ON DELETE CASCADE;


--
-- TOC entry 4810 (class 2606 OID 16615)
-- Name: pools fk_object; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pools
    ADD CONSTRAINT fk_object FOREIGN KEY (object_id) REFERENCES public.objects(object_id) ON DELETE CASCADE;


--
-- TOC entry 4806 (class 2606 OID 16620)
-- Name: cleaning_logs fk_pool; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cleaning_logs
    ADD CONSTRAINT fk_pool FOREIGN KEY (pool_id) REFERENCES public.pools(pool_id) ON DELETE CASCADE;


--
-- TOC entry 4809 (class 2606 OID 16625)
-- Name: pool_visits fk_pool; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pool_visits
    ADD CONSTRAINT fk_pool FOREIGN KEY (pool_id) REFERENCES public.pools(pool_id) ON DELETE CASCADE;


--
-- TOC entry 4808 (class 2606 OID 16630)
-- Name: pool_filter_logs pool_filter_logs_filter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pool_filter_logs
    ADD CONSTRAINT pool_filter_logs_filter_id_fkey FOREIGN KEY (filter_id) REFERENCES public.filters(filter_id) ON DELETE CASCADE;


--
-- TOC entry 4811 (class 2606 OID 16635)
-- Name: water_additions water_additions_pool_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.water_additions
    ADD CONSTRAINT water_additions_pool_id_fkey FOREIGN KEY (pool_id) REFERENCES public.pools(pool_id) ON DELETE CASCADE;


-- Completed on 2025-08-07 11:14:37

--
-- PostgreSQL database dump complete
--

