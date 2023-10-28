import { React, useState } from "react";
import { Form, Container, Button, Table } from "react-bootstrap";

export default function DynamicControlMode() {
  const [enableEditing, setEnableEditing] = useState(false);

  const [counterTimerHighValue, setCounterTimerHighValue] = useState("");
  const [counterTimerModarateValue, setCounterTimerModarateValue] =
    useState("");
  const [counterTimerLowValue, setCounterTimerLowValue] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      counterTimerHighValue: counterTimerHighValue,
      counterTimerModarateValue: counterTimerModarateValue,
      counterTimerLowValue: counterTimerLowValue,
    };

    alert("Data: " + JSON.stringify(data));
  };

  return (
    <div>
      <Container className="shadow pt-2 pb-2 bg-white mt-4 border rounded">
        <Form className="mt-2 p-3">
          <div className="row">
            <div className="col-md-9">
              <h5>Dynamic Control Mode</h5>
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
                  <th>Traffic Level</th>
                  <th>Counter Timer</th>
                </tr>
                <tr>
                  <th>High</th>
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
                        value={counterTimerHighValue}
                        onChange={(e) =>
                          setCounterTimerHighValue(e.target.value)
                        }
                      />
                    </Form.Group>
                  </th>
                </tr>
                <tr>
                  <th>Modarate</th>
                  <Form.Group
                    className="mb-0"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      maxLength={3}
                      placeholder="20"
                      disabled={!enableEditing}
                      value={counterTimerModarateValue}
                      onChange={(e) =>
                        setCounterTimerModarateValue(e.target.value)
                      }
                    />
                  </Form.Group>
                </tr>
                <tr>
                  <th>Low</th>
                  <Form.Group
                    className="mb-0"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Control
                      type="text"
                      maxLength={3}
                      placeholder="10"
                      disabled={!enableEditing}
                      value={counterTimerLowValue}
                      onChange={(e) => setCounterTimerLowValue(e.target.value)}
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
  );
}
