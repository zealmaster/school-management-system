import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnToStudentTable1683446241262
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE students ADD COLUMN student_id VARCHAR(200),
      ADD COLUMN admission_year YEAR, ADD COLUMN admission_session VARCHAR(100),
      ADD COLUMN graduation_year YEAR, ADD COLUMN graduation_session VARCHAR(100),
      ADD COLUMN sex VARCHAR(50), CHANGE COLUMN date_of_birth date_of_birth DATE NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE students DROP COLUMN student_id, DROP COLUMN admission_year, 
        DROP COLUMN admission_session, DROP COLUMN graduation_year DROP COLUMN graduation_session, 
        DROP COLUMN sex, CHANGE COLUMN date_of_birth VARCHAR(80)`,
    );
  }
}
