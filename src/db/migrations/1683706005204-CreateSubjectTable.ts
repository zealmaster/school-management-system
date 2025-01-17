import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSubjectTable1683706005204 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE subjects (id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
      school_id BIGINT UNSIGNED NOT NULL,
      teacher_id BIGINT UNSIGNED, 
      name VARCHAR(255) NOT NULL, 
      level VARCHAR(100) NOT NULL, 
      session VARCHAR(80) NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (school_id) REFERENCES schools(id), FOREIGN KEY (teacher_id) REFERENCES teachers(id))`,
    );
    await queryRunner.query(
      `ALTER TABLE subjects ADD CONSTRAINT FK_subject_schoolId_1 FOREIGN KEY (school_id) REFERENCES schools(id)`,
    );
    await queryRunner.query(
      `ALTER TABLE subjects ADD CONSTRAINT FK_subject_teacherId_1 FOREIGN KEY (teacher_id) REFERENCES teachers(id)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE subjects REMOVE FOREIGN KEY FK_subject_schoolId_1`,
    );
    await queryRunner.query(
      `ALTER TABLE subjects REMOVE FOREIGN KEY FK_subject_teacherId_1`,
    );
    await queryRunner.query(`DROP TABLE subjects`);
  }
}
