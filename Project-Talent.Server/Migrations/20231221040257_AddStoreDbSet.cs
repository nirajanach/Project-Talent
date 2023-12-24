using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Project_Talent.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddStoreDbSet : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "id",
                table: "Sales",
                newName: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Id",
                table: "Sales",
                newName: "id");
        }
    }
}
