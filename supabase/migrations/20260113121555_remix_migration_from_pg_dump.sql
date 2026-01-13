CREATE EXTENSION IF NOT EXISTS "pg_graphql";
CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";
CREATE EXTENSION IF NOT EXISTS "plpgsql";
CREATE EXTENSION IF NOT EXISTS "supabase_vault";
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";
BEGIN;

--
-- PostgreSQL database dump
--


-- Dumped from database version 17.6
-- Dumped by pg_dump version 18.1

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
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--



--
-- Name: app_role; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.app_role AS ENUM (
    'admin',
    'moderator',
    'user'
);


--
-- Name: property_category; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.property_category AS ENUM (
    'land',
    'house',
    'vehicle',
    'furniture'
);


--
-- Name: property_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.property_status AS ENUM (
    'available',
    'sold',
    'pending'
);


--
-- Name: has_role(uuid, public.app_role); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.has_role(_user_id uuid, _role public.app_role) RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;


--
-- Name: is_admin(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.is_admin() RETURNS boolean
    LANGUAGE sql STABLE SECURITY DEFINER
    SET search_path TO 'public'
    AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = 'admin'
  )
$$;


--
-- Name: update_updated_at_column(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at_column() RETURNS trigger
    LANGUAGE plpgsql
    SET search_path TO 'public'
    AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;


SET default_table_access_method = heap;

--
-- Name: properties; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.properties (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    category public.property_category NOT NULL,
    title text NOT NULL,
    description text,
    price numeric(15,2) NOT NULL,
    location text,
    status public.property_status DEFAULT 'available'::public.property_status NOT NULL,
    featured boolean DEFAULT false,
    images text[] DEFAULT '{}'::text[],
    features text[] DEFAULT '{}'::text[],
    size text,
    bedrooms integer,
    bathrooms integer,
    land_size text,
    year_built integer,
    parking_spaces integer,
    make text,
    model text,
    year integer,
    mileage integer,
    fuel_type text,
    transmission text,
    color text,
    engine_size text,
    material text,
    dimensions text,
    condition text,
    brand text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    created_by uuid DEFAULT auth.uid()
);


--
-- Name: properties_public; Type: VIEW; Schema: public; Owner: -
--

CREATE VIEW public.properties_public WITH (security_invoker='true') AS
 SELECT id,
    category,
    title,
    description,
    price,
    location,
    status,
    featured,
    images,
    features,
    size,
    bedrooms,
    bathrooms,
    year_built,
    parking_spaces,
    land_size,
    make,
    model,
    year,
    mileage,
    fuel_type,
    transmission,
    color,
    engine_size,
    material,
    dimensions,
    condition,
    brand,
    created_at,
    updated_at
   FROM public.properties;


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_roles (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    role public.app_role NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: properties properties_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (id);


--
-- Name: user_roles user_roles_user_id_role_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_role_key UNIQUE (user_id, role);


--
-- Name: properties update_properties_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_properties_updated_at BEFORE UPDATE ON public.properties FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();


--
-- Name: properties properties_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.properties
    ADD CONSTRAINT properties_created_by_fkey FOREIGN KEY (created_by) REFERENCES auth.users(id);


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: properties Admins and owners can view full property data; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins and owners can view full property data" ON public.properties FOR SELECT TO authenticated USING ((public.has_role(auth.uid(), 'admin'::public.app_role) OR (created_by = auth.uid())));


--
-- Name: user_roles Admins can manage all roles; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Admins can manage all roles" ON public.user_roles TO authenticated USING (public.has_role(auth.uid(), 'admin'::public.app_role));


--
-- Name: properties Anon can view properties; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Anon can view properties" ON public.properties FOR SELECT TO anon USING (true);


--
-- Name: properties Authenticated users can create their own properties; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Authenticated users can create their own properties" ON public.properties FOR INSERT TO authenticated WITH CHECK ((created_by = auth.uid()));


--
-- Name: properties Users can delete their own properties; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can delete their own properties" ON public.properties FOR DELETE TO authenticated USING ((created_by = auth.uid()));


--
-- Name: properties Users can update their own properties; Type: POLICY; Schema: public; Owner: -
--

CREATE POLICY "Users can update their own properties" ON public.properties FOR UPDATE TO authenticated USING ((created_by = auth.uid())) WITH CHECK ((created_by = auth.uid()));


--
-- Name: properties; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;

--
-- Name: user_roles; Type: ROW SECURITY; Schema: public; Owner: -
--

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

--
-- PostgreSQL database dump complete
--




COMMIT;