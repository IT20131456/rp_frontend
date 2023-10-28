import {React, useState} from 'react';
import { Form, Container, Button, Table } from "react-bootstrap";

export default function ManualControlMode() {

  const [enableEditing, setEnableEditing] = useState(false);

  const [counterTimerLane01Value, setCounterTimerLane01Value] = useState("");
  const [counterTimerLane02Value, setCounterTimerLane02Value] = useState("");
  const [counterTimerLane03Value, setCounterTimerLane03Value] = useState("");
  const [counterTimerLane04Value, setCounterTimerLane04Value] = useState("");


  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      counterTimerLane01Value: counterTimerLane01Value,
      counterTimerLane02Value: counterTimerLane02Value,
      counterTimerLane03Value: counterTimerLane03Value,
      counterTimerLane04Value: counterTimerLane04Value,
    };

    alert("Data: " + JSON.stringify(data));
  };
  
  return (
    <div>
        <Container className="shadow pt-2 pb-2 bg-white mt-4 border rounded">
        <Form className="mt-2 p-3">
          <div className="row">
            <div className="col-md-9">
              <h5>Manual Control Mode</h5>
            </div>

            <div className="col-md-3 ">
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Enable Editing"
                checked={enableEditing}
                onChange={() => setEnableEditing(!enableEditing)}
              />
            </div>

            <div className="row"></div>
            <div className="col-md-12">
              <hr style={{ height: 10 }} />
            </div>
          </div>
          <div style={{ width: "30%" }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Traffic Lane</th>
                  <th>Counter Timer</th>
                </tr>
                <tr>
                  <th>Lane 01</th>
                  <th>
                    <Form.Group
                      className="mb-0"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        maxLength={3}
                        placeholder="30"
                        disabled={!enableEditing}
                        value={counterTimerLane01Value}
                        onChange={(e) =>
                          setCounterTimerLane01Value(e.target.value)
                        }
                      />
                    </Form.Group>
                  </th>
                </tr>
                <tr>
                  <th>Lane 02</th>
                  <Form.Group
                      className="mb-0"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        maxLength={3}
                        placeholder="20"
                        disabled={!enableEditing}
                        value={counterTimerLane02Value}
                        onChange={(e) =>
                          setCounterTimerLane02Value(e.target.value)
                        }
                      />
                    </Form.Group>
                </tr>
                <tr>
                  <th>Lane 03</th>
                  <Form.Group
                      className="mb-0"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        maxLength={3}
                        placeholder="10"
                        disabled={!enableEditing}
                        value={counterTimerLane03Value}
                        onChange={(e) =>
                          setCounterTimerLane03Value(e.target.value)
                        }
                      />
                    </Form.Group>
                </tr>
                <tr>
                  <th>Lane 04</th>
                  <Form.Group
                      className="mb-0"
                      controlId="exampleForm.ControlInput1"
                    >
                      <Form.Control
                        type="text"
                        maxLength={3}
                        placeholder="10"
                        disabled={!enableEditing}
                        value={counterTimerLane04Value}
                        onChange={(e) =>
                          setCounterTimerLane04Value(e.target.value)
                        }
                      />
                    </Form.Group>
                </tr>
              </thead>
              <tbody></tbody>
            </Table>

            <div>
              {enableEditing ? (
                <Button variant="success" type="submit" onClick={onSubmit}>
                  Update Model
                </Button>
              ) : (
                <Button variant="success" type="submit" onClick={onSubmit}>
                  Activate Model
                </Button>
              )}
            </div>

          </div>
        </Form>
        </Container>
    </div>
  )
}
