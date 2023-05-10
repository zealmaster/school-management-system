import { MigrationInterface, QueryRunner } from 'typeorm';

export class createFeesTable1683286771221 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(
      `CREATE TABLE fees (id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, school_id BIGINT UNSIGNED NOT NULL,
                level VARCHAR(100) NOT NULL, amount DECIMAL(10, 2) NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE fees`);
  }
}
