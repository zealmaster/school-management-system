import { MigrationInterface, QueryRunner } from 'typeorm';

export class createFeesTable1683286771221 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE fees (id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
      school_id BIGINT UNSIGNED NOT NULL,
      level VARCHAR(100) NOT NULL, 
      amount DECIMAL(10, 2) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)`,
    );

    await queryRunner.query(
      `ALTER TABLE fees ADD CONSTRAINT FK_fees_schoolId_1 FOREIGN KEY (school_id) REFERENCES schools(id)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE fees REMOVE FOREIGN KEY FK_fees_schoolId_1`,
    );
    await queryRunner.query(`DROP TABLE fees`);
  }
}
