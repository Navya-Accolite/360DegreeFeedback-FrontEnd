import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Row, Col, Input } from 'reactstrap';
import { Button } from 'reactstrap';

function ManageUsers() {
  const [email, updateEmail] = useState('');
  const [role, updateRole] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  function updateuser() {
    const url = `http://localhost:4545/api/update/${email}`;
    const postdata = {
      role: role,
    };
    axios
      .put(url, postdata, { headers: { 'Content-Type': 'application/json' } })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div>
        <h3>Manage your Users!</h3>
      </div>

      <div className="manageusers">
        <div>
          <div>
            <Label for="exampleEmail" sm={2}>
              Email
            </Label>
            <Col sm={10}>
              <Input
                id="exampleEmail"
                name="email"
                placeholder="with a placeholder"
                type="email"
                onChange={(e) => updateEmail(e.target.value)}
              />
            </Col>
          </div>

          <div>
            <Label for="exampleSelect" sm={2}>
              Select
            </Label>
            <Col sm={10}>
              <div
                style={{
                  border: '1px solid #ced4da',
                  borderRadius: '0.25rem',
                  padding: '0.375rem 0.75rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={() => setShowOptions(!showOptions)}
              >
                <div>{role ? role : 'Select'}</div>
                <div
                  style={{
                    borderLeft: '1px solid #ced4da',
                    paddingLeft: '0.5rem',
                  }}
                >
                  <span
                    className={
                      showOptions
                        ? 'fas fa-chevron-up'
                        : 'fas fa-chevron-down'
                    }
                  ></span>
                </div>
              </div>
              {showOptions && (
                <div
                  style={{
                    position: 'absolute',
                    backgroundColor: '#fff',
                    border: '1px solid #ced4da',
                    borderRadius: '0.25rem',
                    width: '100%',
                    marginTop: '0.5rem',
                  }}
                >
                  <option
                    style={{ padding: '0.375rem 0.75rem' ,
                            cursor:'pointer' 
                  }}
                    value="ADMIN"
                    onClick={() => {
                      updateRole('ADMIN');
                      setShowOptions(false);
                    }}
                  >
                    ADMIN
                  </option>
                  <option
                    style={{ padding: '0.375rem 0.75rem' ,
                    cursor: 'pointer',}}
                    value="USER"
                    onClick={() => {
                      updateRole('USER');
                      setShowOptions(false);
                    }}
                  >
                    USER
                  </option>
                </div>
              )}
            </Col>
          </div>
          <button id="btn4" onClick={() => updateuser()}>
            Update
          </button>
        </div>
      </div>
    </>
  );
}

export default ManageUsers;
