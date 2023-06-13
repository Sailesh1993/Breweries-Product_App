import React, { useState } from "react"
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material"
import Navbar from "../components/Navbar"

const ContactPage = () => {

const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [contact, setContact] = useState('')
  const [message, setMessage] = useState('')
  
  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setName('')
    setEmail('')
    setAddress('')
    setContact('')
    setMessage('')
  }
  return (
    <div>
      <Navbar />
      <Box
        component="form"
        sx={{
          display: "flex",
          alignItems:'center',
          flexDirection: "column",
          gap: "1rem",
          margin:"80px ",
        }}
        onSubmit={handleSubmit}
      >
        <Typography sx={{ fontFamily: "sans-serif", fontSize: "25px" }}>
          Feel free to contact us.
        </Typography>
        <TextField label="Name" variant="outlined" required value={name}
          onChange={(e) => setName(e.target.value)}/>
        <TextField label="Email" variant="outlined" type="email" required value={email}
          onChange={(e) => setEmail(e.target.value)}/>
        <TextField label="Address" variant="outlined" type="text" required value={address}
          onChange={(e) => setAddress(e.target.value)} />
        <TextField label="Contact No." variant="outlined" type="number" value={contact}
          onChange={(e) => setContact(e.target.value)}/>
        <TextField
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </div>
  );
};

export default ContactPage;
