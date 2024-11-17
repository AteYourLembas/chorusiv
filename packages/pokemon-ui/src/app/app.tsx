import React, { useEffect, useState } from 'react';
import { EnhancedSortLabel } from './enhanced-sort-label';
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
  pokemon_type: string;
  selected: boolean;
}

interface Profile {
  id: string;
  name: string;
  pokemon: Pokemon[];
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
  const [currentOrderBy, setOrderBy] = useState<'name' | 'pokemon_type' | 'selected'>('name');
  const [orderDirection, setOrderDirection] = useState<'asc' | 'desc'>('asc');

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

  const handleSort = (property: 'name' | 'pokemon_type' | 'selected') => {
    const isAsc = currentOrderBy === property && orderDirection === 'asc';
    setOrderDirection(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
    const sortedData = [...pokemon].sort((a, b) => {
      if (a[property] < b[property]) return isAsc ? -1 : 1;
      if (a[property] > b[property]) return isAsc ? 1 : -1;
      return 0;
    });
    setPokemon(sortedData);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedPokemon = [...pokemon];
    updatedPokemon[index].selected = !updatedPokemon[index].selected;
    setPokemon(updatedPokemon);
  };

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
  
      // Extract Pokémon IDs from the selected profile
      const selectedPokemonIds = newValue.pokemon.map((p) => p.uuid);
  
      // Mark Pokémon in the selected profile as selected
      setPokemon((prevPokemon) =>
        prevPokemon.map((p) => ({
          ...p,
          selected: selectedPokemonIds.includes(p.uuid),
        }))
      );
    }
  };

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
  
      // Only reset the state after the API calls succeed
      // TODO: Improve UX -- don't clear profile after an update
      setProfileName('');
      setSelectedProfile(null);
      setPokemon((prevPokemon) =>
        prevPokemon.map((p) => ({ ...p, selected: false }))
      );
    } catch (error) {
      // TODO: Show error message to the user
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
      <Box sx={{ height: 16 }} />
      <Autocomplete
        freeSolo
        options={profiles}
        getOptionLabel={(option) =>
          typeof option === 'string' ? option : option.name
        }
        value={selectedProfile || profileName}
        onChange={(event, newValue) => handleProfileChange(event, newValue)}
        onInputChange={(event, newInputValue) => setProfileName(newInputValue)} // Update the profileName state
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
                <EnhancedSortLabel
                  property="name"
                  currentOrderBy={currentOrderBy}
                  orderDirection={orderDirection}
                  handleSort={handleSort}
                >
                  Name
                </EnhancedSortLabel>
              </TableCell>
              <TableCell>
                <EnhancedSortLabel
                  property="pokemon_type"
                  currentOrderBy={currentOrderBy}
                  orderDirection={orderDirection}
                  handleSort={handleSort}
                >
                  Type
                </EnhancedSortLabel>
              </TableCell>
              <TableCell>
                <EnhancedSortLabel
                  property="selected"
                  currentOrderBy={currentOrderBy}
                  orderDirection={orderDirection}
                  handleSort={handleSort}
                >
                  Selected
                </EnhancedSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pokemon.map((p: Pokemon, index: number) => (
              <TableRow key={p.uuid}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.pokemon_type}</TableCell>
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
