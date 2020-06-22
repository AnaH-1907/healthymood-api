const db = require('../db.js');

class RecipeCategory {
  constructor (recipeCategory) {
    this.id = recipeCategory.id;
    this.name = recipeCategory.name;
  }

  static async create (newRecipeCategory) {
    return db
      .query('INSERT INTO recipe_categories SET ?', newRecipeCategory)
      .then((res) => {
        newRecipeCategory.id = res.insertId;
        return newRecipeCategory;
      });
  }

  static async findById (id) {
    return db
      .query('SELECT * FROM recipe_categories WHERE id = ?', [id])
      .then((rows) => {
        if (rows.length) {
          return Promise.resolve(rows[0]);
        } else {
          const err = new Error();
          err.kind = 'not_found';
          return Promise.reject(err);
        }
      });
  }

  static async nameAlreadyExists (name) {
    return db
      .query('SELECT * FROM recipe_categories WHERE name = ?', [name])
      .then((rows) => {
        if (rows.length) {
          return Promise.resolve(true);
        } else {
          return Promise.resolve(false);
        }
      });
  }

  static async getAll (result) {
    return db.query('SELECT * FROM recipe_categories');
  }

  static async updateById (id, recipeCategory) {
    return db
      .query('UPDATE recipe_categories SET name = ?, WHERE id = ?', [
        recipeCategory.name,
        id
      ])
      .then(() => this.findById(id));
  }

  static async remove (id) {
    return db.query('DELETE FROM recipe_categories WHERE id = ?', id).then((res) => {
      if (res.affectedRows !== 0) {
        return Promise.resolve();
      } else {
        const err = new Error();
        err.kind = 'not_found';
        return Promise.reject(err);
      }
    });
  }

  static async removeAll (result) {
    return db.query('DELETE FROM recipe_categories');
  }
}

module.exports = RecipeCategory;