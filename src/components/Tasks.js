import React, { useState, useEffect } from "react";
import { useAuth } from "oidc-react";


import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
const Tasks = () => {
    const auth = useAuth()

    const [tasks, setTasks] = useState(Array);
    const [isDone, setIsDone] = useState(false);

    useEffect(() => {
        if (!auth.isLoading) {
            const token = auth.userData?.access_token
            const headers = { 'Authorization': 'Bearer ' + token };
            fetch('http://localhost:8000/v1/tasks', { headers })
                .then((res) => res.json())
                .then((data) => {
                    setTasks(data?.tasks);
                    setIsDone(true);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        }
    }, [auth]);
    return (
        <>
            {isDone ? (tasks.map((task) => {
                return (
                    <Card bg="dark" text="light" className="shadow m-3 bg-opacity-75">
                        <Card.Header>{task.name}</Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-1">
                                <p>
                                    {' '}{task.description}{' '}
                                </p>
                                <footer className="blockquote-footer">
                                    Points: <strong>{task.points}</strong>
                                </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                );
            })) : ([...Array(2)].map((task) => {
                return (
                    <Card bg="dark" text="light" className="shadow m-3 bg-opacity-50">
                        <Card.Header><Placeholder as="p" animation="glow">
                            <Placeholder xs={3} />
                        </Placeholder></Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-1">
                                <p>
                                    {' '}
                                    <Placeholder as="p" animation="glow">
                                        <Placeholder xs={12} />
                                        <Placeholder xs={8} />
                                    </Placeholder>
                                    {' '}
                                </p>

                                <Placeholder as="p" animation="glow">
                                <footer className="blockquote-footer">
                                     Points: <Placeholder xs={2} />
                                    
                                </footer>
                                </Placeholder>
                            </blockquote>
                        </Card.Body>
                    </Card>
                );
            }))}
        </>
    );
};

export default Tasks;