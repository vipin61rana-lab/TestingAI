import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// Setup lowdb in-memory
const adapter = new JSONFile('db.json');
const db = new Low(adapter);

// Helper: Generate unique claim ID
function generateClaimId() {
  return `CLAIM-${Date.now()}-${Math.floor(Math.random()*1000)}`;
}

// Seed data
async function seedClaims() {
  await db.read();
  db.data ||= { claims: [] };
  if (db.data.claims.length === 0) {
    db.data.claims = [
      {
        id: 'CLAIM-1678886400001',
        clientInfo: {
          firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', phone: '123-456-7890'
        },
        claimDetails: {
          policyNumber: 'POL-98765', claimType: 'Auto', dateOfIncident: '2023-03-15', description: 'Minor fender bender in the parking lot.'
        },
        status: 'Submitted'
      },
      {
        id: 'CLAIM-1678886400002',
        clientInfo: {
          firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', phone: '234-567-8901'
        },
        claimDetails: {
          policyNumber: 'POL-12345', claimType: 'Home', dateOfIncident: '2023-04-10', description: 'Water damage in basement.'
        },
        status: 'Submitted'
      },
      {
        id: 'CLAIM-1678886400003',
        clientInfo: {
          firstName: 'Alice', lastName: 'Brown', email: 'alice.brown@example.com', phone: '345-678-9012'
        },
        claimDetails: {
          policyNumber: 'POL-54321', claimType: 'Health', dateOfIncident: '2023-05-05', description: 'Hospitalization for surgery.'
        },
        status: 'Submitted'
      },
      {
        id: 'CLAIM-1678886400004',
        clientInfo: {
          firstName: 'Bob', lastName: 'Lee', email: 'bob.lee@example.com', phone: '456-789-0123'
        },
        claimDetails: {
          policyNumber: 'POL-67890', claimType: 'Auto', dateOfIncident: '2023-06-20', description: 'Windshield replacement.'
        },
        status: 'Submitted'
      },
      {
        id: 'CLAIM-1678886400005',
        clientInfo: {
          firstName: 'Carol', lastName: 'White', email: 'carol.white@example.com', phone: '567-890-1234'
        },
        claimDetails: {
          policyNumber: 'POL-11223', claimType: 'Home', dateOfIncident: '2023-07-12', description: 'Fire damage in kitchen.'
        },
        status: 'Submitted'
      }
    ];
    await db.write();
  }
}

seedClaims();

// GET /api/claims (optionally with search)
app.get('/api/claims', async (req, res) => {
  await db.read();
  const { search } = req.query;
  let claims = db.data.claims || [];
  if (search) {
    const query = search.toLowerCase();
    claims = claims.filter(c =>
      c.id.toLowerCase().includes(query) ||
      c.clientInfo.firstName.toLowerCase().includes(query) ||
      c.clientInfo.lastName.toLowerCase().includes(query)
    );
  }
  res.json(claims);
});

// POST /api/claims
app.post('/api/claims', async (req, res) => {
  await db.read();
  const claim = req.body;
  claim.id = generateClaimId();
  claim.status = 'Submitted';
  db.data.claims.push(claim);
  await db.write();
  res.status(201).json(claim);
});

// PUT /api/claims/:id
app.put('/api/claims/:id', async (req, res) => {
  await db.read();
  const { id } = req.params;
  const idx = db.data.claims.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Claim not found' });
  db.data.claims[idx] = { ...db.data.claims[idx], ...req.body, id };
  await db.write();
  res.json(db.data.claims[idx]);
});

// DELETE /api/claims/:id
app.delete('/api/claims/:id', async (req, res) => {
  await db.read();
  const { id } = req.params;
  const idx = db.data.claims.findIndex(c => c.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Claim not found' });
  db.data.claims.splice(idx, 1);
  await db.write();
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
