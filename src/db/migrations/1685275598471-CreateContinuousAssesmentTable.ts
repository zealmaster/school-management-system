import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContinuousAssesmentTable1685275598471
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE continuous_assessment (id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
            student_id BIGINT UNSIGNED NOT NULL, school_id BIGINT UNSIGNED NOT NULL, 
            subject_id BIGINT UNSIGNED NOT NULL, teacher_id BIGINT UNSIGNED NOT NULL, 
            level VARCHAR(100) NOT NULL, score INT NOT NULL, percentage_score DECIMAL(10, 2) NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (student_id) REFERENCES students(id), FOREIGN KEY (school_id) REFERENCES schools(id),
            FOREIGN KEY (subject_id) REFERENCES subjects(id))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE continuous_assessment');
  }
}
