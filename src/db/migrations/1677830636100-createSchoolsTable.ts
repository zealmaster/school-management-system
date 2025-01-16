import { MigrationInterface, QueryRunner } from 'typeorm';

export class createSchoolsTable1677830636100 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
    `CREATE TABLE schools (id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    user_id BIGINT UNSIGNED, 
    location_id BIGINT UNSIGNED, 
    school_type_id BIGINT UNSIGNED,
    name VARCHAR(255), address VARCHAR(255), 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, 
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP)`,
    );

    await queryRunner.query(
      `ALTER TABLE schools ADD CONSTRAINT FK_schools_userId_1 FOREIGN KEY (user_id) REFERENCES users(id)`,
    );
    await queryRunner.query(
      `ALTER TABLE schools ADD CONSTRAINT FK_schools_locationId_1 FOREIGN KEY (location_id) REFERENCES locations(id)`,
    );
    await queryRunner.query(
      `ALTER TABLE schools ADD CONSTRAINT FK_schools_schoolTypeId_1 FOREIGN KEY (location_id) REFERENCES locations(id)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE schools REMOVE FOREIGN KEY FK_schools_userId_1`);
    await queryRunner.query(`ALTER TABLE schools REMOVE FOREIGN KEY FK_schools_locationId_1`);
    await queryRunner.query(`DROP TABLE schools`);
  }
}
