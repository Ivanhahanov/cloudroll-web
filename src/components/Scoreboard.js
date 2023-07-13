import React from "react";
import Table from 'react-bootstrap/Table';

function Scoreboard() {
  return (
    <div className="shadow m-3 p-4 bg-dark rounded shadow bg-opacity-75">
    <Table hover variant="dark" className="bg-opacity-0 rounded">
      <thead>
        <tr>
          <th>Place</th>
          <th>Team</th>
          <th></th>
          <th>Points</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>AwesomeTeam</td>
          <td></td>
          <td>4500</td>
        </tr>
        <tr>
          <td>2</td>
          <td>Naliway</td>
          <td></td>
          <td>3200</td>
        </tr>
        <tr>
          <td>3</td>
          <td>Nakateam</td>
          <td></td>
          <td>2200</td>
        </tr>
      </tbody>
    </Table>
    </div>
  );
}

export default Scoreboard;