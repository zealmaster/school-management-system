import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddVerifyColumnToUsersTable1681726614959
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE users ADD COLUMN verified_email TINYINT(1)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE users DROP COLUMN verifiedEmail`);
  }
}
