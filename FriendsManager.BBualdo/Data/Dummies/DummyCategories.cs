using Data.Models;

namespace Data.Dummies;

public static class DummyCategories
{
  public static List<Category> GetCategories()
  {
    return
    [
      new Category
      {
        Id = 1,
        Name = "Family"
      },

      new Category
      {
        Id = 2,
        Name = "BFs"
      },

      new Category
      {
        Id = 3,
        Name = "Teammates"
      },

      new Category
      {
        Id = 4,
        Name = "Close Friends"
      },

      new Category
      {
        Id = 5,
        Name = "Good Friends"
      }
    ];
  }
}