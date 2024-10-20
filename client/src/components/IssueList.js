import React, { useEffect, useState } from 'react';
import {
    Container,
    Card,
    CardContent,
    Typography,
    Box,
} from '@mui/material';

const IssueList = () => {
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchIssues = async () => {
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

        fetchIssues();
    }, []);

    if (loading) return <></>;
    if (error) return <Typography color="error">{error}</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Issue List
            </Typography>
            <Box display="flex" flexWrap="wrap">
                {issues.map(issue => (
                    <Card key={issue.id}>
                        <CardContent>
                            <Typography variant="h5">{issue.title}</Typography>
                            <Typography variant="body" color="textSecondary">
                                {issue.description || 'No description provided.'}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Container>
    );
};

export default IssueList;
