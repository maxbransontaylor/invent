import React from 'react';
import DepartmentList from '../DepartmentList';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../../utils/queries';

//Modal styling from react-bootstrap
import { Card, Modal, Button, Form } from 'react-bootstrap';

const EventList = () => {
    const { loading, data } = useQuery(QUERY_EVENTS);

    const events = data?.events || {};

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!events.length) {
        return (
            <>
                <h3>No Events Scheduled</h3>
                <Create />
            </>
        );
    }

    //Create Event Modal
    function AddEventsModal(props) {
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Create Events
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Create Events</h4>
                    <p>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta
                        ac consectetur ac, vestibulum at eros.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={props.onHide}>Save</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    function Create() {
        const [modalShow, setModalShow] = React.useState(false);

        //EventList should have name, timeOf, dateOf, location
        //On each hover edit button
        //onMouseover opacity (like react portfolio)
        //edit bring up modal that contains editable name, timeOf, dateOf, location, description(readonly)
        //

        return (
            <>
                <Button variant="primary" onClick={() => setModalShow(true)}>
                    Create Events
                </Button>

                <AddEventsModal show={modalShow} onHide={() => setModalShow(false)} />
            </>
        );
    }

    const EditEventModal = props => {
        <div>
            <Button variant="primary" onClick={handleShow}>
                Edit
            </Button>
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Event</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formContact">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="input"
                                    placeholder="Enter your name"
                                    name='contactName'
                                    value={reservation.contactName}
                                    onChange={handleChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formContactInfo">
                                <Form.Label>Contact Info</Form.Label>
                                <Form.Control
                                    type="input"
                                    name='contactInfo'
                                    placeholder="Provide the best way to contact you"
                                    value={reservation.contactInfo}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formEventName">
                                <Form.Label>Event Name/Description</Form.Label>
                                <Form.Control
                                    type="input"
                                    name='eventName'
                                    placeholder="Enter a brief name for your event"
                                    value={reservation.eventName}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formDate">
                                <Form.Label>Desired Date/Time</Form.Label>
                                <DateTime
                                    className="form-control"
                                    name='eventDate'
                                    value={reservation.eventDate}
                                    onChange={handleChange} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Submit
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </div>
    }

    return (
        <div>
            <Create />
            <h3>Your Current Events</h3>
            {events &&
                events.map((event) => (
                    <div key={event._id} className="card mb-3 col-6">
                        <div className="card-header">
                            <p>{event.name}</p>
                        </div>
                        <div className="card-body row">
                            {event.timeOf}
                            {event.dateOf}
                            <br />
                            {event.dept}
                            <br />
                            {event.completion}
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default EventList;
