import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateSubjectTable1683706005204 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE subjects (id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, school_id BIGINT UNSIGNED,
              teacher_id BIGINT UNSIGNED, name VARCHAR(255), level VARCHAR(100), session VARCHAR(80),
              created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (school_id) REFERENCES schools(id), FOREIGN KEY (teacher_id) REFERENCES teachers(id))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE subjects`);
  }
}
