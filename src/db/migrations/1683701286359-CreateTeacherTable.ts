import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTeacherTable1683701286359 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE teachers (id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, first_name VARCHAR(100), 
      school_id BIGINT UNSIGNED, last_name VARCHAR(100), middle_name VARCHAR(100), sex VARCHAR(20), 
      dirth_of_birth DATE, address VARCHAR(255), phone VARCHAR(100), email VARCHAR(200),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (school_id) REFERENCES schools(id))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE teachers`);
  }
}
