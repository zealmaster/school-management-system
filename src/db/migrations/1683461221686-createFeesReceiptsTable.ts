import { MigrationInterface, QueryRunner } from 'typeorm';

export class createFeesReceiptsTable1683461221686
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE fees_receipts (id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        student_id BIGINT UNSIGNED NOT NULL, amount DECIMAL(10, 2) NOT NULL,
        transaction_reference VARCHAR(50) NOT NULL, level VARCHAR(50) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (student_id) REFERENCES students(id))`,
    );

    await queryRunner.query(
      `ALTER TABLE fees_receipts ADD CONSTRAINT FK_feeReceipt_studentId_1 FOREIGN KEY (student_id) REFERENCES students(id)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE fees_receipts REMOVE FOREIGN KEY FK_feeReceipt_studentId_1`,
    );
    await queryRunner.query(`DROP TABLE fees_receipts`);
  }
}
