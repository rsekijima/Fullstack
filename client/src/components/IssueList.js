import React, { useEffect, useState } from 'react';
import {
    Container,
    Card,
    CardContent,
    Typography,
    Box,
    Button,
} from '@mui/material';

const IssueList = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchIssues();
    }, []);

    const fetchIssues = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/issues');
            if (!response.ok) throw new Error('Failed to fetch issues');
            setIssues(await response.json());
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://localhost:5000/api/issues/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error('Failed to delete issue');

            fetchIssues();
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) return <></>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Issue List
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
                {issues.map(issue => (
                    <Card key={issue.id} style={{ position: 'relative' }}>
                        <CardContent>
                            <Typography variant="h5">{issue.title}</Typography>
                            <Typography variant="body" color="textSecondary">
                                {issue.description || 'No description provided.'}
                            </Typography>
                            <Button
                                variant="contained"
                                color="error"
                                style={{ position: 'absolute', top: '10px', right: '10px' }}
                                onClick={() => handleDelete(issue.id)}
                            >
                                Delete
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default IssueList;
