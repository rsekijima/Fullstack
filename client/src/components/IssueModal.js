import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Button,
} from '@mui/material';

const IssueModal = ({ issue, onClose, onUpdate }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (issue) {
            setTitle(issue.title);
            setDescription(issue.description);
        } else {
            setTitle('');
            setDescription('');
        }
    }, [issue]);

    const handleSubmit = async () => {
        try {
            const method = issue ? 'PUT' : 'POST';
            const url = issue ? `http://localhost:5000/api/issues/${issue.id}` : 'http://localhost:5000/api/issues';
            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, description }),
            });
            if (!response.ok) throw new Error(issue ? 'Failed to update issue' : 'Failed to create issue');
            onUpdate();
            onClose();
        } catch (err) {
            console.error(err.message);
        }
    };

    return (
        <Dialog open={Boolean(issue) || !issue} onClose={onClose}>
            <DialogTitle>{issue ? 'Edit Issue' : 'Create Issue'}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Title"
                    fullWidth
                    variant="outlined"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    fullWidth
                    variant="outlined"
                    multiline
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    {issue ? 'Update' : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default IssueModal;
