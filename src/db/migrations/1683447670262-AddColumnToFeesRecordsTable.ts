import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddColumnToFeesRecordsTable1683447670262
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE fees_records ADD COLUMN session VARCHAR(200)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE fees_records DROP COLUMN session`);
  }
}
