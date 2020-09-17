import { promises as fs } from 'fs';
import path from 'path';

const assetPath = path.join(__dirname, '../', 'database', 'db.json');

export const getData = async (req, res) => {
  try {
    const data = await fs.readFile(assetPath);
    const jsonData = JSON.parse(data);
    return res.status(200).json({ data: jsonData }).end();
  } catch (e) {
    console.log('e: ', e);
    return res.status(400).json({ data: 'Data not found' }).end();
  }
};

export const postData = async (req, res) => {
  try {
    const data = await fs.readFile(assetPath);
    const jsonData = JSON.parse(data);
    jsonData.push(req.body);
    await fs.writeFile(assetPath, JSON.stringify(jsonData, null, 2));
    return res.status(201).json({ data: 'Event added to database' }).end();
  } catch (e) {
    console.log('e: ', e);
    return res.status(400).json({ data: 'Couldnt write file to database' }).end();
  }
};

export const updateData = async (req, res) => {
  console.log('req: ', req.params);
  try {
    const data = await fs.readFile(assetPath);
    const jsonData = JSON.parse(data);
    if (jsonData.find((item) => item.id === req.params.id)) {
      const modifiedData = jsonData.map((item) => {
        if (req.params.id) {
          return { ...item, ...req.body[req.params.id] };
        }
        return item;
      });
      await fs.writeFile(assetPath, JSON.stringify(modifiedData, null, 2));
      return res.status(200).json({ data: 'Event Updated in database' }).end();
    }
    return res.status(400).json({ data: `Couldnt find event in the database` }).end();
  } catch (e) {
    console.log('e: ', e);
    return res.status(400).json({ data: 'Couldnt update event in database' }).end();
  }
};

export const deleteData = async (req, res) => {
  try {
    const data = await fs.readFile(assetPath);
    const jsonData = JSON.parse(data);
    if (jsonData.find((event) => event.id === req.params.id)) {
      const modifiedData = jsonData.filter((item) => item.id !== req.params.id);
      await fs.writeFile(assetPath, JSON.stringify(modifiedData, null, 2));
      return res.status(200).json({ data: 'Event deleted in database' }).end();
    }
    return res
      .status(400)
      .json({ data: `Couldnt find id: ${req.query.id} in database` })
      .end();
  } catch (e) {
    console.log('e: ', e);
    return res.status(400).json({ data: 'Couldnt delete event in database' }).end();
  }
};
