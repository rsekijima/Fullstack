const Issue = require('../models/issueModel');

const issueController = {
    getIssues: async (req, res) => {
        try {
            const issues = await Issue.findAll();
            console.log('Retrieved all issues:', issues);
            res.status(200).json(issues);
        } catch (err) {
            console.error('Error retrieving issues:', err.message);
            res.status(500).json({ error: 'Failed to retrieve issues' });
        }
    },

    getIssueById: async (req, res) => {
        const { id } = req.params;
        try {
            const issue = await Issue.findByPk(id);
            if (!issue) {
                console.log(`Issue not found with id: ${id}`);
                return res.status(404).json({ error: 'Issue not found' });
            }
            console.log(`Retrieved issue with id: ${id}`, issue);
            res.status(200).json(issue);
        } catch (err) {
            console.error(`Error retrieving issue with id: ${id}`, err.message)
            res.status(500).json({ error: 'Failed to retrieve issue' });
        }
    },

    createIssue: async (req, res) => {
        const { title, description } = req.body;
        try {
            const newIssue = await Issue.create({ title, description });
            console.log('Created new issue:', newIssue);
            res.status(201).json(newIssue);
        } catch (err) {
            console.error('Error creating issue:', err.message);
            res.status(400).json({ error: 'Failed to create issue' });
        }
    },

    updateIssue: async (req, res) => {
        const { id } = req.params;
        const { title, description } = req.body;
        try {
            const issue = await Issue.findByPk(id);
            if (!issue) {
                console.error(`Issue not found with id: ${id}`);
                return res.status(404).json({ error: 'Issue not found' });
            }

            await issue.update({ title, description });
            console.log(`Updated issue with id: ${id}`, issue);
            res.status(200).json(issue);
        } catch (err) {
            console.error('Error updating issue:', err.message);
            res.status(400).json({ error: 'Failed to update issue' });
        }
    },

    deleteIssue: async (req, res) => {
        const { id } = req.params;
        try {
            const issue = await Issue.findByPk(id);
            if (!issue) {
                console.error(`Issue not found with id: ${id}`);
                return res.status(404).json({ error: 'Issue not found' });
            }

            await issue.destroy();
            console.log(`Deleted issue with id: ${id}`);
            res.status(204).send();
        } catch (err) {
            console.error(`Error deleting issue with id: ${id}`, err.message);
            res.status(500).json({ error: 'Failed to delete issue' });
        }
    },
};

module.exports = issueController;
