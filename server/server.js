const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors({
    'Access-Control-Allow-Origin': '*'
}));


app.get('/', (req, res) => {
    res.send('Сервер працює');
});

const doctors = 'doctors.json';
const users = 'users.json';
const appointments = 'appointments.json';

app.get('/api/doctors', (req, res) => {
    fs.readFile(doctors, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        } else {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        }
    });
});

app.get('/api/users', (req, res) => {
    fs.readFile(users, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        } else {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        }
    });
});

app.get('/api/appointments', (req, res) => {
    fs.readFile(appointments, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        } else {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        }
    });
});

app.post('/api/doctors', (req, res) => {
    fs.readFile(doctors, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        } else {
            const jsonData = JSON.parse(data);
            jsonData.push(req.body);

            const updateData = JSON.stringify(jsonData, null, 2);

            fs.writeFile(doctors, updateData, 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Server error' });
                } else {
                    res.json({ message: 'Data added' });
                }
            })
        }
    })
});

app.post('/api/users', (req, res) => {
    fs.readFile(users, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        } else {
            const jsonData = JSON.parse(data);
            jsonData.push(req.body);

            const updateData = JSON.stringify(jsonData, null, 2);

            fs.writeFile(users, updateData, 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Server error' });
                } else {
                    res.json({ message: 'Data added' });
                }
            })
        }
    })
});

app.post('/api/appointments', (req, res) => {
    fs.readFile(appointments, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        } else {
            const jsonData = JSON.parse(data);
            jsonData.push(req.body);

            const updateData = JSON.stringify(jsonData, null, 2);

            fs.writeFile(appointments, updateData, 'utf8', (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Server error' });
                } else {
                    res.json({ message: 'Appointment added' });
                }
            })
        }
    })
});

app.delete('/api/appointments/:appointmentId', (req, res) => {
    const appointmentId = req.params.appointmentId;

    fs.readFile(appointments, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Server error' });
        } else {
            const jsonData = JSON.parse(data);
            const updatedData = jsonData.filter(item => item.appointmentId !== appointmentId);

            fs.writeFile(appointments, JSON.stringify(updatedData, null, 2), 'utf8', err => {
                if (err) {
                    console.error(err);
                    res.status(500).json({ error: 'Server error' });
                } else {
                    res.status(200).json({ message: 'Appointment deleted' });
                }
            });
        }
    });
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})


