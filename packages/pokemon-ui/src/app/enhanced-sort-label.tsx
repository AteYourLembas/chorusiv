import React from 'react';
import { TableSortLabel } from '@mui/material';

interface EnhancedSortLabelProps {
  property: 'name' | 'pokemon_type' | 'selected'; // Add more keys as needed
  currentOrderBy: 'name' | 'pokemon_type' | 'selected';
  orderDirection: 'asc' | 'desc';
  handleSort: (property: 'name' | 'pokemon_type' | 'selected') => void;
  children: React.ReactNode;
}

export const EnhancedSortLabel: React.FC<EnhancedSortLabelProps> = ({
  property,
  currentOrderBy,
  orderDirection,
  handleSort,
  children,
}) => {
  const isActive = currentOrderBy === property;
  const direction = isActive ? orderDirection : 'asc';

  return (
    <TableSortLabel
      active={isActive}
      direction={direction}
      onClick={() => handleSort(property)}
    >
      {children}
    </TableSortLabel>
  );
};

export default EnhancedSortLabel;