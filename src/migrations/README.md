# Database Migrations

## Creating Migrations

After making changes to entities, generate a migration:

```bash
npm run migration:generate -- -n MigrationName
```

## Running Migrations

### Development
```bash
npm run migration:run
```

### Production (Hostinger)
```bash
# Via SSH (if available)
npm run migration:run

# Or temporarily enable synchronize for first deployment
# Set DB_SYNCHRONIZE=true, deploy, then set back to false
```

## Reverting Migrations

```bash
npm run migration:revert
```

## Important Notes

- **Never use `synchronize: true` in production**
- Always test migrations locally first
- Backup database before running migrations in production
- Migrations are stored in `src/migrations/` directory

