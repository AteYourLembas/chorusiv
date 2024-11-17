import { PostgreSqlContainer as OriginalPostgreSqlContainer } from '@testcontainers/postgresql';

export class PostgreSqlContainer extends OriginalPostgreSqlContainer {
    withInitScript(initScriptPath: string): this {
        this.withCopyFilesToContainer([
            {
                source: initScriptPath,
                target: '/docker-entrypoint-initdb.d/init.sql', // Default location for PostgreSQL initialization scripts
            },
        ]);
        return this;
    }
}