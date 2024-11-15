import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import { pokemonService } from '../services/pokemonService';
import { profileService } from '../services/profileService';

interface Pokemon {
  uuid: string;
  name: string;
  type: string;
  selected: boolean;
}

interface Profile {
  id: string;
  name: string;
  pokemonIds: string[];
}

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export function App() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<Profile | null>(null);
  const [profileName, setProfileName] = useState('');
  const [orderBy, setOrderBy] = useState<'name' | 'type'>('name');
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');

  // Load Pokémon and Profiles on Initial Launch
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const allPokemon = await pokemonService.getAllPokemon();
        const allProfiles = await profileService.getAllProfiles();
        setPokemon(
          allPokemon.map((p: Omit<Pokemon, 'selected'>) => ({
            ...p,
            selected: false,
          }))
        );
        setProfiles(allProfiles);
      } catch (error) {
        console.error('Failed to load initial data:', error);
      }
    };

    fetchInitialData();
  }, []);

  // Handle Sorting
  const handleSort = (property: keyof Pokemon) => {
    const isAsc = orderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    const sortedData = [...pokemon].sort((a, b) => {
      if (a[property] < b[property]) return isAsc ? -1 : 1;
      if (a[property] > b[property]) return isAsc ? 1 : -1;
      return 0;
    });
    setPokemon(sortedData);
  };

  // Handle Checkbox Selection
  const handleCheckboxChange = (index: number) => {
    const updatedPokemon = [...pokemon];
    updatedPokemon[index].selected = !updatedPokemon[index].selected;
    setPokemon(updatedPokemon);
  };

  // Handle Profile Change
  const handleProfileChange = (
    _: React.SyntheticEvent,
    newValue: Profile | string | null
  ) => {
    if (typeof newValue === 'string') {
      setProfileName(newValue);
      setSelectedProfile(null);
      // Deselect all Pokémon when creating a new profile
      setPokemon((prevPokemon) =>
        prevPokemon.map((p) => ({ ...p, selected: false }))
      );
    } else if (newValue) {
      setProfileName(newValue.name);
      setSelectedProfile(newValue);

      // Mark Pokémon in the selected profile as selected
      setPokemon((prevPokemon) =>
        prevPokemon.map((p) => ({
          ...p,
          selected: newValue.pokemonIds.includes(p.uuid),
        }))
      );
    }
  };

  // Handle Save/Upsert Profile
  const handleUpsertProfile = async () => {
    if (!profileName) {
      console.error('Profile name is required');
      return;
    }

    const selectedPokemonIds = pokemon
      .filter((p) => p.selected)
      .map((p) => p.uuid);

    try {
      await profileService.upsertProfile(profileName, selectedPokemonIds);

      const updatedProfiles = await profileService.getAllProfiles();
      setProfiles(updatedProfiles);
      setProfileName('');
      setSelectedProfile(null);
      setPokemon((prevPokemon) =>
        prevPokemon.map((p) => ({ ...p, selected: false }))
      );
    } catch (error) {
      console.error('Failed to upsert profile:', error);
    }
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tory's Pokémon Team Builder
          </Typography>
        </Toolbar>
      </AppBar>
      <Autocomplete
        freeSolo
        options={profiles}
        getOptionLabel={(option) => (typeof option === 'string' ? option : option.name)}
        value={selectedProfile || profileName}
        onChange={(event, newValue) => handleProfileChange(event, newValue)}
        renderInput={(params) => <TextField {...params} label="Profile" />}
        style={{ width: 300, marginBottom: 20 }}
      />
      <Button
        variant="contained"
        onClick={handleUpsertProfile}
        style={{ marginBottom: 20 }}
      >
        {selectedProfile ? 'Update' : 'Add'}
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'name'}
                  direction={orderBy === 'name' ? orderDirection : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'type'}
                  direction={orderBy === 'type' ? orderDirection : 'asc'}
                  onClick={() => handleSort('type')}
                >
                  Type
                </TableSortLabel>
              </TableCell>
              <TableCell>Selected</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemon.map((p: Pokemon, index: number) => (
              <TableRow key={p.uuid}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.type}</TableCell>
                <TableCell>
                  <Checkbox
                    checked={p.selected}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default App;
