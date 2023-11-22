--
-- PostgreSQL database dump
--

-- Dumped from database version 15.3
-- Dumped by pg_dump version 15.2

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

DROP TABLE IF EXISTS public.meanings;

--
-- Name: meanings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.meanings (
    id uuid NOT NULL,
    text character varying(100) NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.meanings OWNER TO postgres;

--
-- Name: meanings PK_fd5c63fa2d0f7c17845f3a58186; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.meanings
    ADD CONSTRAINT "PK_fd5c63fa2d0f7c17845f3a58186" PRIMARY KEY (id);


--
-- PostgreSQL database dump complete
--

