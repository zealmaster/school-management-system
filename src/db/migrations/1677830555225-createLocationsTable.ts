import { MigrationInterface, QueryRunner } from 'typeorm';

export class createLocationsTable1677830555225 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE locations (id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
              location VARCHAR(255), state VARCHAR(50),
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE locations`);
  }
}
