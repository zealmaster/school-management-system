import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTeacherTable1683701286359 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE teachers (id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
      first_name VARCHAR(100) NOT NULL, 
      school_id BIGINT UNSIGNED NOT NULL, 
      last_name VARCHAR(100) NOT NULL, 
      middle_name VARCHAR(100),
      title VARCHAR(20), 
      sex VARCHAR(20) NOT NULL, 
      date_of_birth DATE NOT NULL, 
      address VARCHAR(255) NOT NULL, 
      phone VARCHAR(100) NOT NULL, 
      email VARCHAR(200) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)`,
    );
    await queryRunner.query(
      `ALTER TABLE teachers ADD CONSTRAINT FK_teacher_schoolId_1 FOREIGN KEY (school_id) REFERENCES schools(id)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE teachers REMOVE FOREIGN KEY FK_teacher_schoolId_1`,
    );
    await queryRunner.query(`DROP TABLE teachers`);
  }
}
