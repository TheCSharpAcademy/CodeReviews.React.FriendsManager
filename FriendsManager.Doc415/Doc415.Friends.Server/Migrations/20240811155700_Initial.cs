using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Doc415.Friends.Server.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "FCategories",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_FCategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Friends",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LastContact = table.Column<DateOnly>(type: "date", nullable: false),
                    MinRecontactInDays = table.Column<int>(type: "int", nullable: false),
                    InCategoryId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LastContactMethod = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Friends", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Friends_FCategories_InCategoryId",
                        column: x => x.InCategoryId,
                        principalTable: "FCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "FCategories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { new Guid("18d88db4-4bf1-4064-bb6f-a4c19db5e318"), "Social" },
                    { new Guid("2627e2a9-55e0-4cfb-afd7-64545d7cf41e"), "Work" },
                    { new Guid("35992ccc-8293-48f4-9ff0-e311413ba6c6"), "School" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Friends_InCategoryId",
                table: "Friends",
                column: "InCategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Friends");

            migrationBuilder.DropTable(
                name: "FCategories");
        }
    }
}
