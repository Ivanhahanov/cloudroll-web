import React, { useState, useEffect } from "react";
import { useAuth } from "oidc-react";


import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
const TeamCard = () => {
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
                        <Card.Body>
                            
                        </Card.Body>
                    </Card>
                );
            })) : ([...Array(1)].map((task) => {
                return (
                    <Card bg="dark" text="light" className="shadow m-3 bg-opacity-50">
                        <Card.Body>

                            <Placeholder as="p" animation="glow">
                                Team Name<Placeholder xs={2} />
                            </Placeholder>
                        </Card.Body>
                    </Card>
                );
            }))}
        </>
    );
};

export default TeamCard;