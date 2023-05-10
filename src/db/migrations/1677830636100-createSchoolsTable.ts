import { MigrationInterface, QueryRunner } from 'typeorm';

export class createSchoolsTable1677830636100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE schools (id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNSIGNED, location_id BIGINT UNSIGNED, 
    name VARCHAR(255), address VARCHAR(255), 
    FOREIGN KEY (user_id) REFERENCES users(id), FOREIGN KEY (location_id) REFERENCES locations(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE schools`);
  }
}
