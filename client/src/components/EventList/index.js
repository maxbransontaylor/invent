import React from 'react';
import DepartmentList from '../DepartmentList';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_EVENTS } from '../../utils/queries';

const EventList = () => {
  const { loading, data } = useQuery(QUERY_EVENTS);

  const events = data?.events || [];

  if (!events.length) {
    return <h3>No Events Scheduled</h3>;
  }

  return (
    <div>
      <h3>Events</h3>
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
