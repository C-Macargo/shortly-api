--
-- PostgreSQL database dump
--

-- Dumped from database version 12.13 (Ubuntu 12.13-0ubuntu0.20.04.1)
-- Dumped by pg_dump version 12.13 (Ubuntu 12.13-0ubuntu0.20.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id integer NOT NULL,
    token text NOT NULL,
    user_id integer,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.sessions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: sessions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.sessions_id_seq OWNED BY public.sessions.id;


--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id integer NOT NULL,
    user_id integer,
    url character varying(255),
    short_url character varying(8),
    visit_count integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: urls_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.urls_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: urls_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.urls_id_seq OWNED BY public.urls.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: sessions id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions ALTER COLUMN id SET DEFAULT nextval('public.sessions_id_seq'::regclass);


--
-- Name: urls id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls ALTER COLUMN id SET DEFAULT nextval('public.urls_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.sessions VALUES (1, '06068098-8bb0-4ad4-9842-88270714e814', 1, '2023-02-23 12:44:29.637695');
INSERT INTO public.sessions VALUES (2, 'db1603d7-b14c-4aff-a516-ddc75cd9cf7f', 2, '2023-02-23 19:10:44.134963');


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES (7, 1, 'https://thechive.com/wp-content/uploads/2022/11/vknzf7y3obw91-1.jpg?attachment_cache_bust=4236764&quality=85&strip=info', 'f3b5c867', 0, '2023-02-23 20:14:17.582662');
INSERT INTO public.urls VALUES (8, 1, 'https://thechive.com/wp-content/uploads/2022/11/vknzf7y3obw91-1.jpg?attachment_cache_bust=4236764&quality=85&strip=info', '21be7076', 0, '2023-02-23 20:14:18.06495');
INSERT INTO public.urls VALUES (9, 1, 'https://thechive.com/wp-content/uploads/2022/11/vknzf7y3obw91-1.jpg?attachment_cache_bust=4236764&quality=85&strip=info', '84f3455b', 0, '2023-02-23 20:14:18.477165');
INSERT INTO public.urls VALUES (10, 1, 'https://thechive.com/wp-content/uploads/2022/11/vknzf7y3obw91-1.jpg?attachment_cache_bust=4236764&quality=85&strip=info', 'e993c5fc', 0, '2023-02-23 20:14:18.821347');
INSERT INTO public.urls VALUES (11, 1, 'https://thechive.com/wp-content/uploads/2022/11/vknzf7y3obw91-1.jpg?attachment_cache_bust=4236764&quality=85&strip=info', '179874ee', 0, '2023-02-23 20:14:19.132764');
INSERT INTO public.urls VALUES (12, 1, 'https://thechive.com/wp-content/uploads/2022/11/vknzf7y3obw91-1.jpg?attachment_cache_bust=4236764&quality=85&strip=info', '8f0a084c', 0, '2023-02-23 20:14:19.366832');
INSERT INTO public.urls VALUES (13, 1, 'https://thechive.com/wp-content/uploads/2022/11/vknzf7y3obw91-1.jpg?attachment_cache_bust=4236764&quality=85&strip=info', 'c27756ca', 0, '2023-02-24 11:04:03.602853');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES (1, 'jin mu won', 'northernblade@email.com', '$2b$10$FypZcT34pBuMlsO1v94y4uxG92MGDK6RTJhteIEy1PMVDqt1rOfNm', '2023-02-23 12:44:20.328176');
INSERT INTO public.users VALUES (2, 'poisondevil', 'poisondevil@email.com', '$2b$10$lGCgXJgEv/KxqQXXoprgiujNzkPSxw3sdANfkQcXTEo/76YjREx1u', '2023-02-23 19:10:33.70906');


--
-- Name: sessions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.sessions_id_seq', 2, true);


--
-- Name: urls_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.urls_id_seq', 13, true);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.users_id_seq', 2, true);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- Name: urls urls_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

