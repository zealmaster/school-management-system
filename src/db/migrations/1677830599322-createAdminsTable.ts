import { MigrationInterface, QueryRunner } from 'typeorm';

export class createAdminsTable1677830599322 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE admins (id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
          first_name VARCHAR(200), last_name VARCHAR(200), full_name VARCHAR(255), 
          email VARCHAR(255), password VARCHAR(200), created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE admins`);
  }
}
