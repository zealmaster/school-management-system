import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateStudentLoginTable1683737579851
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE student_logins (
        id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        student_id VARCHAR(200) NOT NULL,
        password VARCHAR(200) NOT NULL,
        password_temp VARCHAR(20) NOT NULL, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        login_at DATETIME DEFAULT CURRENT_TIMESTAMP DEFAULT NULL)`,
    );
    await queryRunner.query(
      `ALTER TABLE student_logins ADD CONSTRAINT FK_studentLogin_studentId_1 FOREIGN KEY (student_id) REFERENCES students(student_id)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE student_login REMOVE FOREIGN KEY FK_studentLogin_studentId_1`,
    );
    await queryRunner.query(`DROP TABLE student_login`);
  }
}
