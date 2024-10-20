const Issue = require('../models/issueModel');

const issueController = {
    getIssues: async (req, res) => {
        try {
            const issues = await Issue.findAll();
            res.status(200).json(issues);
        } catch (err) {
            res.status(500).json({ error: 'Failed to retrieve issues' });
        }
    },

    getIssueById: async (req, res) => {
        const { id } = req.params;
        try {
            const issue = await Issue.findByPk(id);
            if (!issue) {
                return res.status(404).json({ error: 'Issue not found' });
            }
            res.status(200).json(issue);
        } catch (err) {
            res.status(500).json({ error: 'Failed to retrieve issue' });
        }
    },

    createIssue: async (req, res) => {
        const { title, description } = req.body;
        try {
            const newIssue = await Issue.create({ title, description });
            res.status(201).json(newIssue);
        } catch (err) {
            res.status(400).json({ error: 'Failed to create issue' });
        }
    },

    updateIssue: async (req, res) => {
        const { id } = req.params;
        const { title, description } = req.body;
        try {
            const issue = await Issue.findByPk(id);
            if (!issue) {
                return res.status(404).json({ error: 'Issue not found' });
            }

            await issue.update({ title, description });
            res.status(200).json(issue);
        } catch (err) {
            res.status(400).json({ error: 'Failed to update issue' });
        }
    },

    deleteIssue: async (req, res) => {
        const { id } = req.params;
        try {
            const issue = await Issue.findByPk(id);
            if (!issue) {
                return res.status(404).json({ error: 'Issue not found' });
            }

            await issue.destroy();
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: 'Failed to delete issue' });
        }
    },
};

module.exports = issueController;
