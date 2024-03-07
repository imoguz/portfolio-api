"use strict";

const { db } = require("../config/firebaseConfig");
module.exports = {
  create: async (req, res) => {
    const newData = req.body;
    if (!newData) {
      return res.status(400).send("Request body is missing");
    }

    try {
      await db.collection("projects").add(newData);
      return res.status(201).send("Data added successfull");
    } catch (err) {
      return res.status(500).send("Internal server error.");
    }
  },

  readMany: async (req, res) => {
    try {
      const snapshot = await db.collection("projects").get();

      if (snapshot.empty) {
        return res.status(404).send("No projects found");
      }

      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return res.status(200).send(data);
    } catch (err) {
      return res.status(500).send("Internal server error.");
    }
  },

  readOne: async (req, res) => {
    try {
      const id = req.params.id;

      const doc = await db.collection("projects").doc(id).get();
      if (!doc.exists) {
        return res.status(404).send("Project not found");
      }

      const data = {
        id: doc.id,
        data: doc.data(),
      };

      return res.status(200).send(data);
    } catch (err) {
      return res.status(500).send("Internal server error.");
    }
  },

  update: async (req, res) => {
    const id = req.params.id;
    const newData = req.body;
    if (!newData) {
      return res.status(400).send("Request body is missing");
    }

    try {
      const docRef = db.collection("projects").doc(id);
      await docRef.update(newData);
      return res.status(200).send("Project updated successfully");
    } catch (error) {
      return res.status(500).send("Internal server error.");
    }
  },

  _delete: async (req, res) => {
    try {
      const id = req.params.id;
      const docRef = db.collection("projects").doc(id);
      await docRef.delete();
      return res.status(200).send("Project deleted successfully");
    } catch (error) {
      return res.status(500).send("Internal server error.");
    }
  },
};
