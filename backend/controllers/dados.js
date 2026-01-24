const db = require('../db');

function createDado(req, res, next) {
    try {
    const { title, content } = req.body;

    const stmt = db.prepare('INSERT INTO dados (title, content) VALUES (?, ?)');
    const result = stmt.run(title, content);

    res.status(201).json({ id: result.lastInsertRowid });
  } catch (err) {
    next(err);
  }
}

function getDados(req, res, next) {
   try {
    const stmt = db.prepare('SELECT * FROM dados');
    const dados = stmt.all();

    res.status(200).json(dados);
  } catch (err) {
    next(err);
  }
}

function deleteDado(req, res, next) {
   try {
    const { dadosId } = req.params;

    const stmt = db.prepare('DELETE FROM dados WHERE id = ?');
    const result = stmt.run(dadosId);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Dado não encontrado' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

function updateDado(req, res, next) {
    try {
    const { dadoId } = req.params;
    const { title, content } = req.body;

    const stmt = db.prepare('UPDATE dados SET title = ?, content = ? WHERE id = ?');
    const result = stmt.run(title, content, dadoId);

    if (result.changes === 0) {
      return res.status(404).json({ message: 'Dado não encontrado' });
    }

    const updatedDado = db.prepare('SELECT * FROM dados WHERE id = ?').get(dadoId);

    res.status(200).json(updatedDado);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createDado,
  getDados,
  deleteDado,
  updateDado,
};