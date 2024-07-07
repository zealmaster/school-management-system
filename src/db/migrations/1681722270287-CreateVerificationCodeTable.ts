import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateVerificationCodeTable1681722270287
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE two_fa_codes (
        id BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT, 
        user_id BIGINT UNSIGNED, 
        two_fa_code VARCHAR(100), 
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE verification_code`);
  }
}
