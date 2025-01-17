import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTeacherLoginTable1685106545860
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE teacher_logins (
        id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
        teacher_id BIGINT UNSIGNED NOT NULL,
        password VARCHAR(200) NOT NULL,
        password_temp VARCHAR(20) NOT NULL, 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        login_at DATETIME DEFAULT CURRENT_TIMESTAMP DEFAULT NULL)`,
    );
    await queryRunner.query(
      `ALTER TABLE teacher_logins ADD CONSTRAINT FK_teacherLogin_teacherId_1 FOREIGN KEY (teacher_id) REFERENCES teachers(id)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE teacher_logins REMOVE FOREIGN KEY FK_teacherLogin_teacherId_1`,
    );
    await queryRunner.query(`DROP TABLE teacher_login`);
  }
}
