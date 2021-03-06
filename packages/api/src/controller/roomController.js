const { transaction, Model } = require('objection');
const roomModel = require('../model/roomModel');
const baseController = require('./baseController');


class roomController extends baseController {

  static addUser() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        await super.post(roomModel ,req.body, trx);
        await trx.commit();
        res.sendStatus(201);
      } catch (error) {
        //handle more exceptions
        await trx.rollback();
        res.status(400).json({
          error,
        });
      }
    };
  }

  static getRoomByHotelID() {
    return async (req, res) => {
      try {
        const id = req.params.id;
        //const row = await super.getIndividual(roomModel, id);
        const row = await roomModel.query().where('hotel_id', id).andWhere('availability', true);
        res.status(200).send(row);
      }
      catch (error) {
        res.status(400).send(error);
      }
    }
  }

  //we tried
  static getRoomByHotelIDNum() {
    return async (req, res) => {
      try {
        const id = req.params.id;
        const max = parseInt(req.params.num, 10);
        //const row = await super.getIndividual(roomModel, id);
        const row = await roomModel.query().where('hotel_id', id).andWhere('availability', true).andWhere('max_guests', '>=', max);
        res.status(200).send(row);
      }
      catch (error) {
        res.status(400).send(error);
      }
    }
  }
  static delRoom() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        const isDeleted = await super.delete(roomModel, req.params.room_id, trx);
        await trx.commit();
        if (isDeleted) {
          res.sendStatus(200);
        }
        else {
          res.sendStatus(404);
        }
      }
      catch (error) {
        await trx.rollback();
        res.status(400).json({
          error,
        });
      }
    }
  }

  static updateRoom() {
    return async (req, res) => {
      let trx;
      try {
        trx = await transaction.start(Model.knex());
        const updated = await super.put(roomModel, req.params.room_id, req.body, trx);
        await trx.commit();
        if (!updated) {
          res.sendStatus(404);
        }
        else {
          res.status(200).send(updated);
        }
      }
      catch (error) {
        await trx.rollback();
        res.status(400).send(error);
      }
    }
  }

}

module.exports = roomController;