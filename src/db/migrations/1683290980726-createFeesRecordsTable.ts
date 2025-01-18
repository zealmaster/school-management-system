import { MigrationInterface, QueryRunner } from 'typeorm';

export class createFeesRecordsTable1683290980726 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE fees_records (id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
      student_id BIGINT UNSIGNED NOT NULL, 
      school_id BIGINT UNSIGNED NOT NULL, 
      level VARCHAR(100) NOT NULL, 
      total_fees DECIMAL(10, 2) NOT NULL,
      amount_paid DECIMAL(10, 2), 
      balance DECIMAL(10, 2), 
      status TINYINT(1),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)`,
    );

    await queryRunner.query(
      `ALTER TABLE fees_records ADD CONSTRAINT FK_feesRecord_studentId_1 FOREIGN KEY (student_id) REFERENCES students(id)`,
    );
    await queryRunner.query(
      `ALTER TABLE fees_records ADD CONSTRAINT FK_feeRecord_schoolId_1 FOREIGN KEY (school_id) REFERENCES schools(id)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE fees_records REMOVE FOREIGN KEY FK_feesRecord_studentId_1`,
    );
    await queryRunner.query(
      `ALTER TABLE fees_records REMOVE FOREIGN KEY FK_feesRecord_schoolId_1`,
    );
    await queryRunner.query(`DROP TABLE fees_record`);
  }
}
