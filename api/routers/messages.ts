import express from "express";
import fileDb from "../fileDb";

const messagesRouter = express.Router();

messagesRouter.get('/', async (req, res) => {
  const messages = await fileDb.getItems();

  if (req.query.datetime) {
    const queryDate = req.query.datetime as string;
    const date = new Date(queryDate);
    if (isNaN(date.getDate())) {
      return res.status(400).send({"error": "Invalid datetime"});
    }

    const messageIndexByDatetime = messages.findIndex(message => message.datetime === queryDate);
    const messagesAfterDatetime = messages.slice(messageIndexByDatetime + 1, messages.length);
    return res.send(messagesAfterDatetime);
  }

  const lastThirtyMessages = messages.slice(messages.length < 30 ? 0 : messages.length - 30, messages.length);
  res.send(lastThirtyMessages);
});

messagesRouter.post('/',async (req, res) => {
  if (!req.body.author || !req.body.message) {
    res.status(400)
       .send({"error": "Author and message must be present in the request"});
    return;
  }

  const id = await fileDb.addItem(req.body);
  res.send({ id });
});

export default messagesRouter;