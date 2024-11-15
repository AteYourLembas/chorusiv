export const pokemonService = {
    async getAllPokemon() {
        const response = await fetch('pokemon', {
            method: 'GET',
        });

        if (!response.ok) {
            const text = await response.text(); // Inspect the error response
            console.error('Response text:', text);
            throw new Error(`Failed to fetch pocket monsters: ${response.statusText}`);
        }

        try {
            return await response.json();
        } catch (error) {
            console.error('Failed to parse JSON:', error);
            throw new Error('Response is not valid JSON');
        }
    },
};