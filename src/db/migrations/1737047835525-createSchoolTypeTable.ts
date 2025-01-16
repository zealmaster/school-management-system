import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSchoolTypeTable1737047835525 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE school_types (id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, type VARCHAR(100))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE school_types`);
  }
}
