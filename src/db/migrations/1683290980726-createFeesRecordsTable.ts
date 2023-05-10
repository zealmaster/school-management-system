import { MigrationInterface, QueryRunner } from 'typeorm';

export class createFeesRecordsTable1683290980726 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE fees_records (id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
                student_id BIGINT UNSIGNED NOT NULL, school_id BIGINT UNSIGNED NOT NULL, 
                level VARCHAR(100) NOT NULL, total_fees DECIMAL(10, 2) NOT NULL,
                amount_paid DECIMAL(10, 2), balance DECIMAL(10, 2), status TINYINT(1),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE fees_record`);
  }
}
