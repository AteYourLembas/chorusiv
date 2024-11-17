export const profileService = {
    async upsertProfile(name: string, pokemonIds: string[]) {
        const response = await fetch('/api/profile/upsert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, pokemonIds }),
        });

        if (!response.ok) {
            throw new Error('Failed to upsert profile');
        }

        return response.json();
    },

    async getAllProfiles() {
        const response = await fetch('/api/profile', {
            method: 'GET',
        });

        if (!response.ok) {
            const text = await response.text(); // Inspect the error response
            console.error('Response text:', text);
            throw new Error(`Failed to fetch profiles: ${response.statusText}`);
        }

        try {
            return await response.json();
        } catch (error) {
            console.error('Failed to parse JSON:', error);
            throw new Error('Response is not valid JSON');
        }
    },
};
