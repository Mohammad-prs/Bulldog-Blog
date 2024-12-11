--
-- PostgreSQL database cluster dump
--

-- Started on 2024-12-11 00:27:42

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Roles
--

CREATE ROLE cloud_admin;
ALTER ROLE cloud_admin WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS;
CREATE ROLE neon_superuser;
ALTER ROLE neon_superuser WITH NOSUPERUSER INHERIT CREATEROLE CREATEDB NOLOGIN REPLICATION BYPASSRLS;
CREATE ROLE neondb_owner;
ALTER ROLE neondb_owner WITH NOSUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:O4a7pjvLkvH5cQEfzwn1Qg==$0tLjvzApC7dJjYyoXXGMFbPrdyJ5qMe2h31ZtPJasOs=:l6YbGAM/AUb64ZrsX0C5hqWJKRDlbo5jeySPWSz7SYU=';

--
-- User Configurations
--


--
-- Role memberships
--

GRANT neon_superuser TO neondb_owner WITH INHERIT TRUE GRANTED BY cloud_admin;
GRANT pg_create_subscription TO neon_superuser WITH INHERIT TRUE GRANTED BY cloud_admin;
GRANT pg_monitor TO neon_superuser WITH ADMIN OPTION, INHERIT TRUE GRANTED BY cloud_admin;
GRANT pg_read_all_data TO neon_superuser WITH INHERIT TRUE GRANTED BY cloud_admin;
GRANT pg_write_all_data TO neon_superuser WITH INHERIT TRUE GRANTED BY cloud_admin;






--
-- Databases
--

--
-- Database "template1" dump
--

\connect template1

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 17.0

-- Started on 2024-12-11 00:27:42

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

-- Completed on 2024-12-11 00:27:51

--
-- PostgreSQL database dump complete
--

--
-- Database "neondb" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 17.0

-- Started on 2024-12-11 00:27:51

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
-- TOC entry 3343 (class 1262 OID 16389)
-- Name: neondb; Type: DATABASE; Schema: -; Owner: neondb_owner
--

CREATE DATABASE neondb WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'C.UTF-8';


ALTER DATABASE neondb OWNER TO neondb_owner;

\connect neondb

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
-- TOC entry 216 (class 1259 OID 32769)
-- Name: articles; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.articles (
    id integer NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    published boolean NOT NULL,
    category text NOT NULL,
    articledate date NOT NULL,
    featureimage text
);


ALTER TABLE public.articles OWNER TO neondb_owner;

--
-- TOC entry 215 (class 1259 OID 32768)
-- Name: articles_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.articles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.articles_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3345 (class 0 OID 0)
-- Dependencies: 215
-- Name: articles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.articles_id_seq OWNED BY public.articles.id;


--
-- TOC entry 218 (class 1259 OID 32778)
-- Name: categories; Type: TABLE; Schema: public; Owner: neondb_owner
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.categories OWNER TO neondb_owner;

--
-- TOC entry 217 (class 1259 OID 32777)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: neondb_owner
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO neondb_owner;

--
-- TOC entry 3346 (class 0 OID 0)
-- Dependencies: 217
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: neondb_owner
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 3185 (class 2604 OID 32772)
-- Name: articles id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.articles ALTER COLUMN id SET DEFAULT nextval('public.articles_id_seq'::regclass);


--
-- TOC entry 3186 (class 2604 OID 32781)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 3335 (class 0 OID 32769)
-- Dependencies: 216
-- Data for Name: articles; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.articles (id, title, content, published, category, articledate, featureimage) FROM stdin;
1	The Charming and Sturdy English Bulldog	English Bulldogs are known for their distinct wrinkled faces, muscular build, and gentle demeanor. Despite their tough appearance, they are affectionate companions that make great family pets. Learn about their care needs, common health issues, and why they are beloved around the world.	t	Family-Friendly	2024-01-10	\N
2	Meet the Compact and Playful company : French Bulldog	French Bulldogs are small in size but big in personality. Known for their bat-like ears and charming nature, they are one of the most popular small dog breeds. This article explores their history, temperament, and the best ways to care for your Frenchie.	t	Small Breeds	2024-02-05	\N
3	The Athletic and Loyal American Bulldog	American Bulldogs are larger and more active compared to their English and French counterparts. With their muscular build and high energy, they are great companions for active families. This article covers their exercise requirements, training tips, and how to keep them healthy.	t	Active Breeds	2024-03-01	\N
4	The Gentle and Calm Victorian Bulldog	Victorian Bulldogs are a modern breed developed to retain the charm of the traditional bulldog while reducing health issues. They are known for their calm temperament, loyalty, and suitability for families with children. This article highlights their history, care needs, and personality traits.	f	Family-Friendly	2024-04-15	\N
5	The Exotic and Rare Alapaha Blue Blood Bulldog	Alapaha Blue Blood Bulldogs are a rare breed known for their striking appearance and strong guarding instincts. This article explores their origins in the southern United States, their protective nature, and the commitment required to care for this unique breed.	f	Exotic Breeds	2024-05-10	\N
\.


--
-- TOC entry 3337 (class 0 OID 32778)
-- Dependencies: 218
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: neondb_owner
--

COPY public.categories (id, name) FROM stdin;
1	Family-Friendly
2	Small Breeds
3	Active Breeds
4	Exotic Breeds
\.


--
-- TOC entry 3347 (class 0 OID 0)
-- Dependencies: 215
-- Name: articles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.articles_id_seq', 1, false);


--
-- TOC entry 3348 (class 0 OID 0)
-- Dependencies: 217
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: neondb_owner
--

SELECT pg_catalog.setval('public.categories_id_seq', 1, false);


--
-- TOC entry 3188 (class 2606 OID 32776)
-- Name: articles articles_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.articles
    ADD CONSTRAINT articles_pkey PRIMARY KEY (id);


--
-- TOC entry 3190 (class 2606 OID 32785)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: neondb_owner
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3344 (class 0 OID 0)
-- Dependencies: 3343
-- Name: DATABASE neondb; Type: ACL; Schema: -; Owner: neondb_owner
--

GRANT ALL ON DATABASE neondb TO neon_superuser;


--
-- TOC entry 2044 (class 826 OID 16391)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- TOC entry 2043 (class 826 OID 16390)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO neon_superuser WITH GRANT OPTION;


-- Completed on 2024-12-11 00:27:55

--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

\connect postgres

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.6
-- Dumped by pg_dump version 17.0

-- Started on 2024-12-11 00:27:55

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
-- TOC entry 8 (class 2615 OID 16423)
-- Name: neon; Type: SCHEMA; Schema: -; Owner: cloud_admin
--

CREATE SCHEMA neon;


ALTER SCHEMA neon OWNER TO cloud_admin;

--
-- TOC entry 9 (class 2615 OID 16463)
-- Name: neon_migration; Type: SCHEMA; Schema: -; Owner: cloud_admin
--

CREATE SCHEMA neon_migration;


ALTER SCHEMA neon_migration OWNER TO cloud_admin;

--
-- TOC entry 3 (class 3079 OID 16424)
-- Name: neon; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS neon WITH SCHEMA neon;


--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION neon; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION neon IS 'cloud storage for PostgreSQL';


--
-- TOC entry 2 (class 3079 OID 16392)
-- Name: pg_stat_statements; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_stat_statements WITH SCHEMA public;


--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION pg_stat_statements; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_stat_statements IS 'track planning and execution statistics of all SQL statements executed';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 228 (class 1259 OID 16464)
-- Name: migration_id; Type: TABLE; Schema: neon_migration; Owner: cloud_admin
--

CREATE TABLE neon_migration.migration_id (
    key integer NOT NULL,
    id bigint DEFAULT 0 NOT NULL
);


ALTER TABLE neon_migration.migration_id OWNER TO cloud_admin;

--
-- TOC entry 227 (class 1259 OID 16456)
-- Name: health_check; Type: TABLE; Schema: public; Owner: cloud_admin
--

CREATE TABLE public.health_check (
    id integer NOT NULL,
    updated_at timestamp with time zone DEFAULT now()
);


ALTER TABLE public.health_check OWNER TO cloud_admin;

--
-- TOC entry 226 (class 1259 OID 16455)
-- Name: health_check_id_seq; Type: SEQUENCE; Schema: public; Owner: cloud_admin
--

CREATE SEQUENCE public.health_check_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.health_check_id_seq OWNER TO cloud_admin;

--
-- TOC entry 3399 (class 0 OID 0)
-- Dependencies: 226
-- Name: health_check_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: cloud_admin
--

ALTER SEQUENCE public.health_check_id_seq OWNED BY public.health_check.id;


--
-- TOC entry 3229 (class 2604 OID 16459)
-- Name: health_check id; Type: DEFAULT; Schema: public; Owner: cloud_admin
--

ALTER TABLE ONLY public.health_check ALTER COLUMN id SET DEFAULT nextval('public.health_check_id_seq'::regclass);


--
-- TOC entry 3388 (class 0 OID 16464)
-- Dependencies: 228
-- Data for Name: migration_id; Type: TABLE DATA; Schema: neon_migration; Owner: cloud_admin
--

COPY neon_migration.migration_id (key, id) FROM stdin;
0	11
\.


--
-- TOC entry 3387 (class 0 OID 16456)
-- Dependencies: 227
-- Data for Name: health_check; Type: TABLE DATA; Schema: public; Owner: cloud_admin
--

COPY public.health_check (id, updated_at) FROM stdin;
1	2024-12-11 04:40:57.868156+00
\.


--
-- TOC entry 3400 (class 0 OID 0)
-- Dependencies: 226
-- Name: health_check_id_seq; Type: SEQUENCE SET; Schema: public; Owner: cloud_admin
--

SELECT pg_catalog.setval('public.health_check_id_seq', 1, false);


--
-- TOC entry 3235 (class 2606 OID 16469)
-- Name: migration_id migration_id_pkey; Type: CONSTRAINT; Schema: neon_migration; Owner: cloud_admin
--

ALTER TABLE ONLY neon_migration.migration_id
    ADD CONSTRAINT migration_id_pkey PRIMARY KEY (key);


--
-- TOC entry 3233 (class 2606 OID 16462)
-- Name: health_check health_check_pkey; Type: CONSTRAINT; Schema: public; Owner: cloud_admin
--

ALTER TABLE ONLY public.health_check
    ADD CONSTRAINT health_check_pkey PRIMARY KEY (id);


--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 229
-- Name: FUNCTION pg_export_snapshot(); Type: ACL; Schema: pg_catalog; Owner: cloud_admin
--

GRANT ALL ON FUNCTION pg_catalog.pg_export_snapshot() TO neon_superuser;


--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 230
-- Name: FUNCTION pg_log_standby_snapshot(); Type: ACL; Schema: pg_catalog; Owner: cloud_admin
--

GRANT ALL ON FUNCTION pg_catalog.pg_log_standby_snapshot() TO neon_superuser;


--
-- TOC entry 3398 (class 0 OID 0)
-- Dependencies: 231
-- Name: FUNCTION pg_show_replication_origin_status(OUT local_id oid, OUT external_id text, OUT remote_lsn pg_lsn, OUT local_lsn pg_lsn); Type: ACL; Schema: pg_catalog; Owner: cloud_admin
--

GRANT ALL ON FUNCTION pg_catalog.pg_show_replication_origin_status(OUT local_id oid, OUT external_id text, OUT remote_lsn pg_lsn, OUT local_lsn pg_lsn) TO neon_superuser;


-- Completed on 2024-12-11 00:27:59

--
-- PostgreSQL database dump complete
--

-- Completed on 2024-12-11 00:27:59

--
-- PostgreSQL database cluster dump complete
--

