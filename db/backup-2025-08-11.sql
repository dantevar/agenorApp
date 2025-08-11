--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.5

-- Started on 2025-08-11 15:46:35

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
-- TOC entry 890 (class 1247 OID 16646)
-- Name: area_type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.area_type AS ENUM (
    'C',
    'N'
);


ALTER TYPE public.area_type OWNER TO postgres;

--
-- TOC entry 899 (class 1247 OID 16701)
-- Name: measured; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.measured AS ENUM (
    'BEGINING',
    'MIDDLE',
    'END',
    'MANUAL'
);


ALTER TYPE public.measured OWNER TO postgres;

--
-- TOC entry 893 (class 1247 OID 16661)
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
-- TOC entry 238 (class 1259 OID 16800)
-- Name: chemical_values; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chemical_values (
    lab_id integer NOT NULL,
    chemical_id integer NOT NULL,
    chemical_value numeric(5,2) NOT NULL,
    unit character varying(255)
);


ALTER TABLE public.chemical_values OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16723)
-- Name: chemicals; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.chemicals (
    chemical_id integer NOT NULL,
    chemical_name character varying(255),
    min_value numeric(5,2),
    max_value numeric(5,2),
    unit character varying(10)
);


ALTER TABLE public.chemicals OWNER TO postgres;

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
-- TOC entry 229 (class 1259 OID 16670)
-- Name: cleaning_plans; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cleaning_plans (
    pool_id integer NOT NULL,
    area character varying(255) NOT NULL,
    substance character varying(255),
    substance_conc numeric(5,2),
    process_desc text,
    frequency character varying(255),
    CONSTRAINT cleaning_plan_substance_conc_check CHECK (((substance_conc >= (0)::numeric) AND (substance_conc <= (100)::numeric)))
);


ALTER TABLE public.cleaning_plans OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16565)
-- Name: filter_logs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.filter_logs (
    filter_id integer NOT NULL,
    log_date character varying(10) NOT NULL,
    note character varying(255),
    operator character varying(255)
);


ALTER TABLE public.filter_logs OWNER TO postgres;

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
-- TOC entry 5049 (class 0 OID 0)
-- Dependencies: 219
-- Name: filters_filter_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.filters_filter_id_seq OWNED BY public.filters.filter_id;


--
-- TOC entry 237 (class 1259 OID 16751)
-- Name: lab_results; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.lab_results (
    lab_id integer NOT NULL,
    pool_id integer,
    lab_date date NOT NULL
);


ALTER TABLE public.lab_results OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 16750)
-- Name: lab_results_lab_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.lab_results_lab_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.lab_results_lab_id_seq OWNER TO postgres;

--
-- TOC entry 5050 (class 0 OID 0)
-- Dependencies: 236
-- Name: lab_results_lab_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.lab_results_lab_id_seq OWNED BY public.lab_results.lab_id;


--
-- TOC entry 232 (class 1259 OID 16711)
-- Name: measured_results; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.measured_results (
    measured_id integer NOT NULL,
    pool_id integer NOT NULL,
    measured_time timestamp without time zone NOT NULL,
    measured_type public.measured NOT NULL
);


ALTER TABLE public.measured_results OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16709)
-- Name: measured_results_measured_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.measured_results_measured_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.measured_results_measured_id_seq OWNER TO postgres;

--
-- TOC entry 5051 (class 0 OID 0)
-- Dependencies: 230
-- Name: measured_results_measured_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.measured_results_measured_id_seq OWNED BY public.measured_results.measured_id;


--
-- TOC entry 231 (class 1259 OID 16710)
-- Name: measured_results_pool_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.measured_results_pool_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.measured_results_pool_id_seq OWNER TO postgres;

--
-- TOC entry 5052 (class 0 OID 0)
-- Dependencies: 231
-- Name: measured_results_pool_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.measured_results_pool_id_seq OWNED BY public.measured_results.pool_id;


--
-- TOC entry 235 (class 1259 OID 16732)
-- Name: measured_values; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.measured_values (
    measured_id integer NOT NULL,
    chemical_id integer NOT NULL,
    chemical_value numeric(5,2) NOT NULL
);


ALTER TABLE public.measured_values OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 16731)
-- Name: measured_values_measured_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.measured_values_measured_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.measured_values_measured_id_seq OWNER TO postgres;

--
-- TOC entry 5053 (class 0 OID 0)
-- Dependencies: 234
-- Name: measured_values_measured_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.measured_values_measured_id_seq OWNED BY public.measured_values.measured_id;


--
-- TOC entry 220 (class 1259 OID 16561)
-- Name: objects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.objects (
    object_id integer NOT NULL,
    object_name character varying(255) NOT NULL
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
-- TOC entry 5054 (class 0 OID 0)
-- Dependencies: 221
-- Name: objects_object_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.objects_object_id_seq OWNED BY public.objects.object_id;


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
    pool_capacity numeric(4,1),
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
-- TOC entry 5055 (class 0 OID 0)
-- Dependencies: 225
-- Name: pools_pool_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.pools_pool_id_seq OWNED BY public.pools.pool_id;


--
-- TOC entry 240 (class 1259 OID 16816)
-- Name: ukl_nedostataka; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ukl_nedostataka (
    id integer NOT NULL,
    datum date,
    mb1 text,
    kem1 text,
    tn text,
    radnje text,
    mb2 text,
    kem2 text,
    izvrsitelj text,
    voditelj text
);


ALTER TABLE public.ukl_nedostataka OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 16815)
-- Name: ukl_nedostataka_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ukl_nedostataka_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ukl_nedostataka_id_seq OWNER TO postgres;

--
-- TOC entry 5056 (class 0 OID 0)
-- Dependencies: 239
-- Name: ukl_nedostataka_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ukl_nedostataka_id_seq OWNED BY public.ukl_nedostataka.id;


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
-- TOC entry 5057 (class 0 OID 0)
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
    capacity numeric(5,2) DEFAULT 0 NOT NULL
);


ALTER TABLE public.water_additions OWNER TO postgres;

--
-- TOC entry 4816 (class 2604 OID 16588)
-- Name: filters filter_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filters ALTER COLUMN filter_id SET DEFAULT nextval('public.filters_filter_id_seq'::regclass);


--
-- TOC entry 4827 (class 2604 OID 16754)
-- Name: lab_results lab_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lab_results ALTER COLUMN lab_id SET DEFAULT nextval('public.lab_results_lab_id_seq'::regclass);


--
-- TOC entry 4824 (class 2604 OID 16714)
-- Name: measured_results measured_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.measured_results ALTER COLUMN measured_id SET DEFAULT nextval('public.measured_results_measured_id_seq'::regclass);


--
-- TOC entry 4825 (class 2604 OID 16715)
-- Name: measured_results pool_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.measured_results ALTER COLUMN pool_id SET DEFAULT nextval('public.measured_results_pool_id_seq'::regclass);


--
-- TOC entry 4826 (class 2604 OID 16735)
-- Name: measured_values measured_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.measured_values ALTER COLUMN measured_id SET DEFAULT nextval('public.measured_values_measured_id_seq'::regclass);


--
-- TOC entry 4817 (class 2604 OID 16589)
-- Name: objects object_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.objects ALTER COLUMN object_id SET DEFAULT nextval('public.objects_object_id_seq'::regclass);


--
-- TOC entry 4819 (class 2604 OID 16590)
-- Name: pools pool_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pools ALTER COLUMN pool_id SET DEFAULT nextval('public.pools_pool_id_seq'::regclass);


--
-- TOC entry 4828 (class 2604 OID 16819)
-- Name: ukl_nedostataka id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ukl_nedostataka ALTER COLUMN id SET DEFAULT nextval('public.ukl_nedostataka_id_seq'::regclass);


--
-- TOC entry 4822 (class 2604 OID 16591)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 5041 (class 0 OID 16800)
-- Dependencies: 238
-- Data for Name: chemical_values; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chemical_values (lab_id, chemical_id, chemical_value, unit) FROM stdin;
\.


--
-- TOC entry 5036 (class 0 OID 16723)
-- Dependencies: 233
-- Data for Name: chemicals; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.chemicals (chemical_id, chemical_name, min_value, max_value, unit) FROM stdin;
1	Temperatura	\N	\N	°C
2	pH	6.50	7.80	
3	Slobodni klor	0.20	1.00	mg/L
4	Redoks (pH<7.3, morska voda)	700.00	\N	mV
5	Redoks (pH>7.3, morska voda)	720.00	\N	mV
6	Redoks (pH<7.3, slatka voda)	750.00	\N	mV
7	Redoks (pH>7.3, slatka voda)	770.00	\N	mV
\.


--
-- TOC entry 5020 (class 0 OID 16552)
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
1	2025-08-26 12:33:00	C	33	f
1	2025-08-26 14:33:00	C	33	f
1	2025-08-26 14:34:00	C	33	f
1	2025-08-26 13:44:00	C	33	f
1	2025-08-26 13:46:00	C	33	f
2	2025-08-26 13:40:00	N	cistac	f
3	2025-08-26 13:40:00	N	cistac	f
2	2025-07-29 14:11:00	C	ja	f
2	2025-07-29 06:44:00	C	ja1	f
1	2025-08-22 01:33:00	C	g	f
\.


--
-- TOC entry 5032 (class 0 OID 16670)
-- Dependencies: 229
-- Data for Name: cleaning_plans; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cleaning_plans (pool_id, area, substance, substance_conc, process_desc, frequency) FROM stdin;
1	podovi	3aa	3.00	3	3
1	zidovi	alkohol	4.00	3	3
1	noge	alkohol	4.00	3	3
\.


--
-- TOC entry 5025 (class 0 OID 16565)
-- Dependencies: 222
-- Data for Name: filter_logs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.filter_logs (filter_id, log_date, note, operator) FROM stdin;
1	2025-08-01	ovo je note	ja
1	2025-08-11	ovo je note	ja
1	2025-07-12	isprano	ja
1	2025-08-14	aaa	aaa
1	2025-08-16	16	aaa
1	2025-09-09	9.8.	o
1	2025-08-09	9.8.	o
1	2025-08-06	6.8.	o
\.


--
-- TOC entry 5021 (class 0 OID 16557)
-- Dependencies: 218
-- Data for Name: filters; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.filters (filter_id, object_id, filter_name) FROM stdin;
1	1	prvi_filter
\.


--
-- TOC entry 5040 (class 0 OID 16751)
-- Dependencies: 237
-- Data for Name: lab_results; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.lab_results (lab_id, pool_id, lab_date) FROM stdin;
\.


--
-- TOC entry 5035 (class 0 OID 16711)
-- Dependencies: 232
-- Data for Name: measured_results; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.measured_results (measured_id, pool_id, measured_time, measured_type) FROM stdin;
1	1	2025-08-11 15:23:23.359533	MANUAL
2	1	2025-08-11 15:44:01.751728	BEGINING
\.


--
-- TOC entry 5038 (class 0 OID 16732)
-- Dependencies: 235
-- Data for Name: measured_values; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.measured_values (measured_id, chemical_id, chemical_value) FROM stdin;
1	1	23.00
1	2	6.70
1	3	0.30
1	6	773.00
2	1	25.00
2	2	6.80
2	3	0.40
2	6	774.00
\.


--
-- TOC entry 5023 (class 0 OID 16561)
-- Dependencies: 220
-- Data for Name: objects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.objects (object_id, object_name) FROM stdin;
1	aquapark
2	kupaliste
3	novi
\.


--
-- TOC entry 5026 (class 0 OID 16570)
-- Dependencies: 223
-- Data for Name: pool_visits; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pool_visits (pool_id, visit_date, n_visitors) FROM stdin;
1	2025-07-31	33
1	2025-08-01	12
2	2025-08-01	11
3	2025-08-01	10
7	2025-08-01	11
8	2025-08-01	11
\.


--
-- TOC entry 5027 (class 0 OID 16574)
-- Dependencies: 224
-- Data for Name: pools; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.pools (pool_id, object_id, pool_name, pool_capacity, water_type, is_spa) FROM stdin;
1	1	bazen_prvi	100.0	FRESH	f
2	1	tobogan_crveni	100.0	FRESH	f
3	1	tobogan_zeleni	100.0	FRESH	f
4	2	baby	213.0	SEA	t
5	3	novi_bazen	12.0	SEA	t
6	2	adult	12.0	SEA	t
7	1	adultyy	12.0	FRESH	f
8	1	adultyy5	12.0	SEA	f
9	2	elder	66.0	MIX	f
\.


--
-- TOC entry 5043 (class 0 OID 16816)
-- Dependencies: 240
-- Data for Name: ukl_nedostataka; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ukl_nedostataka (id, datum, mb1, kem1, tn, radnje, mb2, kem2, izvrsitelj, voditelj) FROM stdin;
\.


--
-- TOC entry 5029 (class 0 OID 16578)
-- Dependencies: 226
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, phone, user_group) FROM stdin;
1	mmm@hotmail.com	a	0981111122	C
\.


--
-- TOC entry 5031 (class 0 OID 16584)
-- Dependencies: 228
-- Data for Name: water_additions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.water_additions (pool_id, addition_date, capacity) FROM stdin;
1	2025-08-01	5.00
1	2025-08-02	0.34
2	2025-08-01	23.00
\.


--
-- TOC entry 5058 (class 0 OID 0)
-- Dependencies: 219
-- Name: filters_filter_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.filters_filter_id_seq', 1, true);


--
-- TOC entry 5059 (class 0 OID 0)
-- Dependencies: 236
-- Name: lab_results_lab_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.lab_results_lab_id_seq', 1, false);


--
-- TOC entry 5060 (class 0 OID 0)
-- Dependencies: 230
-- Name: measured_results_measured_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.measured_results_measured_id_seq', 1, false);


--
-- TOC entry 5061 (class 0 OID 0)
-- Dependencies: 231
-- Name: measured_results_pool_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.measured_results_pool_id_seq', 1, false);


--
-- TOC entry 5062 (class 0 OID 0)
-- Dependencies: 234
-- Name: measured_values_measured_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.measured_values_measured_id_seq', 1, false);


--
-- TOC entry 5063 (class 0 OID 0)
-- Dependencies: 221
-- Name: objects_object_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.objects_object_id_seq', 7, true);


--
-- TOC entry 5064 (class 0 OID 0)
-- Dependencies: 225
-- Name: pools_pool_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.pools_pool_id_seq', 9, true);


--
-- TOC entry 5065 (class 0 OID 0)
-- Dependencies: 239
-- Name: ukl_nedostataka_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ukl_nedostataka_id_seq', 1, false);


--
-- TOC entry 5066 (class 0 OID 0)
-- Dependencies: 227
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- TOC entry 4859 (class 2606 OID 16804)
-- Name: chemical_values chemical_values_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chemical_values
    ADD CONSTRAINT chemical_values_pkey PRIMARY KEY (lab_id, chemical_id);


--
-- TOC entry 4853 (class 2606 OID 16730)
-- Name: chemicals chemicals_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chemicals
    ADD CONSTRAINT chemicals_pkey PRIMARY KEY (chemical_id);


--
-- TOC entry 4831 (class 2606 OID 16593)
-- Name: cleaning_logs cleaning_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cleaning_logs
    ADD CONSTRAINT cleaning_logs_pkey PRIMARY KEY (pool_id, cleaning_time);


--
-- TOC entry 4849 (class 2606 OID 16677)
-- Name: cleaning_plans cleaning_plan_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cleaning_plans
    ADD CONSTRAINT cleaning_plan_pkey PRIMARY KEY (pool_id, area);


--
-- TOC entry 4833 (class 2606 OID 16595)
-- Name: filters filters_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filters
    ADD CONSTRAINT filters_pkey PRIMARY KEY (filter_id);


--
-- TOC entry 4857 (class 2606 OID 16756)
-- Name: lab_results lab_results_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lab_results
    ADD CONSTRAINT lab_results_pkey PRIMARY KEY (lab_id);


--
-- TOC entry 4851 (class 2606 OID 16717)
-- Name: measured_results measured_results_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.measured_results
    ADD CONSTRAINT measured_results_pkey PRIMARY KEY (measured_id);


--
-- TOC entry 4855 (class 2606 OID 16739)
-- Name: measured_values measured_values_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.measured_values
    ADD CONSTRAINT measured_values_pkey PRIMARY KEY (measured_id, chemical_id);


--
-- TOC entry 4835 (class 2606 OID 16597)
-- Name: objects objects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.objects
    ADD CONSTRAINT objects_pkey PRIMARY KEY (object_id);


--
-- TOC entry 4839 (class 2606 OID 16599)
-- Name: pool_visits pk_pool_date; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pool_visits
    ADD CONSTRAINT pk_pool_date PRIMARY KEY (pool_id, visit_date);


--
-- TOC entry 4837 (class 2606 OID 16826)
-- Name: filter_logs pool_filter_logs_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filter_logs
    ADD CONSTRAINT pool_filter_logs_pkey PRIMARY KEY (filter_id, log_date);


--
-- TOC entry 4841 (class 2606 OID 16603)
-- Name: pools pools_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pools
    ADD CONSTRAINT pools_pkey PRIMARY KEY (pool_id);


--
-- TOC entry 4861 (class 2606 OID 16823)
-- Name: ukl_nedostataka ukl_nedostataka_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ukl_nedostataka
    ADD CONSTRAINT ukl_nedostataka_pkey PRIMARY KEY (id);


--
-- TOC entry 4843 (class 2606 OID 16605)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4845 (class 2606 OID 16607)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4847 (class 2606 OID 16609)
-- Name: water_additions water_additions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.water_additions
    ADD CONSTRAINT water_additions_pkey PRIMARY KEY (pool_id, addition_date);


--
-- TOC entry 4873 (class 2606 OID 16810)
-- Name: chemical_values chemical_values_chemical_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chemical_values
    ADD CONSTRAINT chemical_values_chemical_id_fkey FOREIGN KEY (chemical_id) REFERENCES public.chemicals(chemical_id);


--
-- TOC entry 4874 (class 2606 OID 16805)
-- Name: chemical_values chemical_values_lab_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.chemical_values
    ADD CONSTRAINT chemical_values_lab_id_fkey FOREIGN KEY (lab_id) REFERENCES public.lab_results(lab_id);


--
-- TOC entry 4868 (class 2606 OID 16678)
-- Name: cleaning_plans cleaning_plan_pool_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cleaning_plans
    ADD CONSTRAINT cleaning_plan_pool_id_fkey FOREIGN KEY (pool_id) REFERENCES public.pools(pool_id);


--
-- TOC entry 4863 (class 2606 OID 16610)
-- Name: filters filters_object_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filters
    ADD CONSTRAINT filters_object_id_fkey FOREIGN KEY (object_id) REFERENCES public.objects(object_id) ON DELETE CASCADE;


--
-- TOC entry 4866 (class 2606 OID 16615)
-- Name: pools fk_object; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pools
    ADD CONSTRAINT fk_object FOREIGN KEY (object_id) REFERENCES public.objects(object_id) ON DELETE CASCADE;


--
-- TOC entry 4862 (class 2606 OID 16620)
-- Name: cleaning_logs fk_pool; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cleaning_logs
    ADD CONSTRAINT fk_pool FOREIGN KEY (pool_id) REFERENCES public.pools(pool_id) ON DELETE CASCADE;


--
-- TOC entry 4865 (class 2606 OID 16625)
-- Name: pool_visits fk_pool; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.pool_visits
    ADD CONSTRAINT fk_pool FOREIGN KEY (pool_id) REFERENCES public.pools(pool_id) ON DELETE CASCADE;


--
-- TOC entry 4872 (class 2606 OID 16757)
-- Name: lab_results lab_results_pool_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.lab_results
    ADD CONSTRAINT lab_results_pool_id_fkey FOREIGN KEY (pool_id) REFERENCES public.pools(pool_id);


--
-- TOC entry 4869 (class 2606 OID 16718)
-- Name: measured_results measured_results_pool_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.measured_results
    ADD CONSTRAINT measured_results_pool_id_fkey FOREIGN KEY (pool_id) REFERENCES public.pools(pool_id);


--
-- TOC entry 4870 (class 2606 OID 16740)
-- Name: measured_values measured_values_chemical_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.measured_values
    ADD CONSTRAINT measured_values_chemical_id_fkey FOREIGN KEY (chemical_id) REFERENCES public.chemicals(chemical_id);


--
-- TOC entry 4871 (class 2606 OID 16745)
-- Name: measured_values measured_values_measured_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.measured_values
    ADD CONSTRAINT measured_values_measured_id_fkey FOREIGN KEY (measured_id) REFERENCES public.measured_results(measured_id);


--
-- TOC entry 4864 (class 2606 OID 16630)
-- Name: filter_logs pool_filter_logs_filter_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.filter_logs
    ADD CONSTRAINT pool_filter_logs_filter_id_fkey FOREIGN KEY (filter_id) REFERENCES public.filters(filter_id) ON DELETE CASCADE;


--
-- TOC entry 4867 (class 2606 OID 16635)
-- Name: water_additions water_additions_pool_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.water_additions
    ADD CONSTRAINT water_additions_pool_id_fkey FOREIGN KEY (pool_id) REFERENCES public.pools(pool_id) ON DELETE CASCADE;


-- Completed on 2025-08-11 15:46:35

--
-- PostgreSQL database dump complete
--

