--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 14.14 (Homebrew)

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

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: pokemon; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.pokemon (
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL,
    pokemon_type character varying NOT NULL
);


ALTER TABLE public.pokemon OWNER TO admin;


-- Insert Pokémon data
INSERT INTO public.pokemon (name, pokemon_type)
VALUES
    ('Bulbasaur', 'Grass/Poison'),
    ('Ivysaur', 'Grass/Poison'),
    ('Venusaur', 'Grass/Poison'),
    ('Charmander', 'Fire'),
    ('Charmeleon', 'Fire'),
    ('Charizard', 'Fire/Flying'),
    ('Squirtle', 'Water'),
    ('Wartortle', 'Water'),
    ('Blastoise', 'Water'),
    ('Caterpie', 'Bug'),
    ('Metapod', 'Bug'),
    ('Butterfree', 'Bug/Flying'),
    ('Weedle', 'Bug/Poison'),
    ('Kakuna', 'Bug/Poison'),
    ('Beedrill', 'Bug/Poison'),
    ('Pidgey', 'Normal/Flying'),
    ('Pidgeotto', 'Normal/Flying'),
    ('Pidgeot', 'Normal/Flying'),
    ('Rattata', 'Normal'),
    ('Raticate', 'Normal'),
    ('Spearow', 'Normal/Flying'),
    ('Fearow', 'Normal/Flying'),
    ('Ekans', 'Poison'),
    ('Arbok', 'Poison'),
    ('Pikachu', 'Electric'),
    ('Raichu', 'Electric'),
    ('Sandshrew', 'Ground'),
    ('Sandslash', 'Ground'),
    ('Nidoran♀', 'Poison'),
    ('Nidorina', 'Poison'),
    ('Nidoqueen', 'Poison/Ground'),
    ('Nidoran♂', 'Poison'),
    ('Nidorino', 'Poison'),
    ('Nidoking', 'Poison/Ground'),
    ('Clefairy', 'Fairy'),
    ('Clefable', 'Fairy'),
    ('Vulpix', 'Fire'),
    ('Ninetales', 'Fire'),
    ('Jigglypuff', 'Normal/Fairy'),
    ('Wigglytuff', 'Normal/Fairy'),
    ('Zubat', 'Poison/Flying'),
    ('Golbat', 'Poison/Flying'),
    ('Oddish', 'Grass/Poison'),
    ('Gloom', 'Grass/Poison'),
    ('Vileplume', 'Grass/Poison'),
    ('Paras', 'Bug/Grass'),
    ('Parasect', 'Bug/Grass'),
    ('Venonat', 'Bug/Poison'),
    ('Venomoth', 'Bug/Poison'),
    ('Diglett', 'Ground'),
    ('Dugtrio', 'Ground'),
    ('Meowth', 'Normal'),
    ('Persian', 'Normal'),
    ('Psyduck', 'Water'),
    ('Golduck', 'Water'),
    ('Mankey', 'Fighting'),
    ('Primeape', 'Fighting'),
    ('Growlithe', 'Fire'),
    ('Arcanine', 'Fire'),
    ('Poliwag', 'Water'),
    ('Poliwhirl', 'Water'),
    ('Poliwrath', 'Water/Fighting'),
    ('Abra', 'Psychic'),
    ('Kadabra', 'Psychic'),
    ('Alakazam', 'Psychic'),
    ('Machop', 'Fighting'),
    ('Machoke', 'Fighting'),
    ('Machamp', 'Fighting'),
    ('Bellsprout', 'Grass/Poison'),
    ('Weepinbell', 'Grass/Poison'),
    ('Victreebel', 'Grass/Poison'),
    ('Tentacool', 'Water/Poison'),
    ('Tentacruel', 'Water/Poison'),
    ('Geodude', 'Rock/Ground'),
    ('Graveler', 'Rock/Ground'),
    ('Golem', 'Rock/Ground'),
    ('Ponyta', 'Fire'),
    ('Rapidash', 'Fire'),
    ('Slowpoke', 'Water/Psychic'),
    ('Slowbro', 'Water/Psychic'),
    ('Magnemite', 'Electric/Steel'),
    ('Magneton', 'Electric/Steel'),
    ('Farfetchd', 'Normal/Flying'),
    ('Doduo', 'Normal/Flying'),
    ('Dodrio', 'Normal/Flying'),
    ('Seel', 'Water'),
    ('Dewgong', 'Water/Ice'),
    ('Grimer', 'Poison'),
    ('Muk', 'Poison'),
    ('Shellder', 'Water'),
    ('Cloyster', 'Water/Ice'),
    ('Gastly', 'Ghost/Poison'),
    ('Haunter', 'Ghost/Poison'),
    ('Gengar', 'Ghost/Poison'),
    ('Onix', 'Rock/Ground'),
    ('Drowzee', 'Psychic'),
    ('Hypno', 'Psychic'),
    ('Krabby', 'Water'),
    ('Kingler', 'Water'),
    ('Voltorb', 'Electric'),
    ('Electrode', 'Electric'),
    ('Exeggcute', 'Grass/Psychic'),
    ('Exeggutor', 'Grass/Psychic'),
    ('Cubone', 'Ground'),
    ('Marowak', 'Ground'),
    ('Hitmonlee', 'Fighting'),
    ('Hitmonchan', 'Fighting'),
    ('Lickitung', 'Normal'),
    ('Koffing', 'Poison'),
    ('Weezing', 'Poison'),
    ('Rhyhorn', 'Ground/Rock'),
    ('Rhydon', 'Ground/Rock'),
    ('Chansey', 'Normal'),
    ('Tangela', 'Grass'),
    ('Kangaskhan', 'Normal'),
    ('Horsea', 'Water'),
    ('Seadra', 'Water'),
    ('Goldeen', 'Water'),
    ('Seaking', 'Water'),
    ('Staryu', 'Water'),
    ('Starmie', 'Water/Psychic'),
    ('Mr. Mime', 'Psychic/Fairy'),
    ('Scyther', 'Bug/Flying'),
    ('Jynx', 'Ice/Psychic'),
    ('Electabuzz', 'Electric'),
    ('Magmar', 'Fire'),
    ('Pinsir', 'Bug'),
    ('Tauros', 'Normal'),
    ('Magikarp', 'Water'),
    ('Gyarados', 'Water/Flying'),
    ('Lapras', 'Water/Ice'),
    ('Ditto', 'Normal'),
    ('Eevee', 'Normal'),
    ('Vaporeon', 'Water'),
    ('Jolteon', 'Electric'),
    ('Flareon', 'Fire'),
    ('Porygon', 'Normal'),
    ('Omanyte', 'Rock/Water'),
    ('Omastar', 'Rock/Water'),
    ('Kabuto', 'Rock/Water'),
    ('Kabutops', 'Rock/Water'),
    ('Aerodactyl', 'Rock/Flying'),
    ('Snorlax', 'Normal'),
    ('Articuno', 'Ice/Flying'),
    ('Zapdos', 'Electric/Flying'),
    ('Moltres', 'Fire/Flying'),
    ('Dratini', 'Dragon'),
    ('Dragonair', 'Dragon'),
    ('Dragonite', 'Dragon/Flying'),
    ('Mewtwo', 'Psychic'),
    ('Mew', 'Psychic');

--
-- Name: pokemon_profile_map; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.pokemon_profile_map (
    id SERIAL,
    profile_uuid UUID NOT NULL,
    pokemon_uuid UUID NOT NULL
);


ALTER TABLE public.pokemon_profile_map OWNER TO admin;

--
-- Name: profile; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.profile (
    uuid uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.profile OWNER TO admin;

--
-- Data for Name: pokemon; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- Data for Name: pokemon_profile_map; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- Name: pokemon_profile_map PK_649241b547fca2c4e6305365223; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pokemon_profile_map
    ADD CONSTRAINT "PK_649241b547fca2c4e6305365223" PRIMARY KEY (profile_uuid, pokemon_uuid);


--
-- Name: pokemon PK_ecf4e892b76fdda5e40e74daa96; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pokemon
    ADD CONSTRAINT "PK_ecf4e892b76fdda5e40e74daa96" PRIMARY KEY (uuid);


--
-- Name: profile PK_fab5f83a1cc8ebe0076c733fd85; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.profile
    ADD CONSTRAINT "PK_fab5f83a1cc8ebe0076c733fd85" PRIMARY KEY (uuid);


--
-- Name: IDX_2ed53b005d87fdfc59877f5876; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "IDX_2ed53b005d87fdfc59877f5876" ON public.pokemon_profile_map USING btree (profile_uuid);


--
-- Name: IDX_cce04c285f36cb63442bc05863; Type: INDEX; Schema: public; Owner: admin
--

CREATE INDEX "IDX_cce04c285f36cb63442bc05863" ON public.pokemon_profile_map USING btree (pokemon_uuid);


--
-- Name: pokemon_profile_map FK_2ed53b005d87fdfc59877f58762; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pokemon_profile_map
    ADD CONSTRAINT "FK_2ed53b005d87fdfc59877f58762" FOREIGN KEY (profile_uuid) REFERENCES public.profile(uuid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: pokemon_profile_map FK_cce04c285f36cb63442bc058639; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.pokemon_profile_map
    ADD CONSTRAINT "FK_cce04c285f36cb63442bc058639" FOREIGN KEY (pokemon_uuid) REFERENCES public.pokemon(uuid) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

