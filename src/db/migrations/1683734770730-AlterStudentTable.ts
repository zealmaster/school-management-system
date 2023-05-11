import { MigrationInterface, QueryRunner } from 'typeorm';

export class AlterStudentTable1683734770730 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE students ADD INDEX idx_student_id (student_id);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
