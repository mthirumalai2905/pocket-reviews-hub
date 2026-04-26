// Railway backend
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");

const app = express();

const PORT = Number(process.env.PORT || 4000);
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:8080";
const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "").toLowerCase();
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB_NAME = process.env.MONGODB_DB_NAME || "pocket_reviews";

if (!MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in backend .env");
}

let clientPromise;
function getCollection() {
  if (!clientPromise) {
    clientPromise = new MongoClient(MONGODB_URI).connect();
  }
  return clientPromise.then((client) =>
    client.db(MONGODB_DB_NAME).collection("reviews"),
  );
}

app.use(
  cors({
    origin: FRONTEND_ORIGIN,
    credentials: false,
  }),
);
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/reviews", async (req, res) => {
  const collection = await getCollection();
  const query = {};
  const includeDraft = req.query.includeDraft === "true";
  const requestedEmail = String(req.query.authorEmail || "").toLowerCase();
  const isAdminRequest = ADMIN_EMAIL && requestedEmail === ADMIN_EMAIL;

  if (req.query.published === "true" && !(includeDraft && isAdminRequest)) query.published = true;
  if (typeof req.query.slug === "string" && req.query.slug) query.slug = req.query.slug;

  const reviews = await collection
    .find(query, { projection: { _id: 0 } })
    .sort({ createdAt: -1 })
    .toArray();

  res.json({ reviews });
});

app.post("/api/reviews", async (req, res) => {
  const body = req.body || {};
  const authorEmail = String(body.authorEmail || "").toLowerCase();
  if (!ADMIN_EMAIL || authorEmail !== ADMIN_EMAIL) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const collection = await getCollection();
  const existing = await collection.find({}, { projection: { slug: 1, _id: 0 } }).toArray();
  const existingSlugs = new Set(existing.map((item) => item.slug));
  const slug = generateUniqueSlug(String(body.title || "review"), existingSlugs);

  const doc = {
    slug,
    title: String(body.title || ""),
    category: String(body.category || ""),
    shortDescription: String(body.shortDescription || ""),
    image:
      typeof body.image === "string" && body.image.trim()
        ? body.image
        : "https://images.unsplash.com/photo-1512258146323-b50194e1212e?auto=format&fit=crop&w=1200&q=80",
    price: String(body.price || ""),
    rating: Number(body.rating || 0),
    summary: String(body.summary || ""),
    pros: Array.isArray(body.pros) ? body.pros : [],
    cons: Array.isArray(body.cons) ? body.cons : [],
    detailed: Array.isArray(body.detailed) ? body.detailed : [],
    amazonUrl: String(body.amazonUrl || ""),
    published: false,
    createdAt: new Date().toISOString(),
    authorEmail,
  };

  await collection.insertOne(doc);
  res.status(201).json({ review: doc });
});

app.patch("/api/reviews", async (req, res) => {
  const body = req.body || {};
  const authorEmail = String(body.authorEmail || "").toLowerCase();
  if (!ADMIN_EMAIL || authorEmail !== ADMIN_EMAIL) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const slug = String(body.slug || "");
  const published = Boolean(body.published);
  const collection = await getCollection();
  await collection.updateOne({ slug }, { $set: { published } });
  res.json({ ok: true });
});

app.put("/api/reviews", async (req, res) => {
  const body = req.body || {};
  const authorEmail = String(body.authorEmail || "").toLowerCase();
  if (!ADMIN_EMAIL || authorEmail !== ADMIN_EMAIL) {
    return res.status(403).json({ message: "Unauthorized" });
  }

  const slug = String(body.slug || "");
  if (!slug) {
    return res.status(400).json({ message: "Missing slug" });
  }

  const collection = await getCollection();
  const existing = await collection.findOne({ slug }, { projection: { _id: 0 } });
  if (!existing) {
    return res.status(404).json({ message: "Review not found" });
  }

  const updateDoc = {
    title: String(body.title || existing.title),
    category: String(body.category || existing.category),
    shortDescription: String(body.shortDescription || existing.shortDescription),
    image:
      typeof body.image === "string" && body.image.trim()
        ? body.image
        : existing.image,
    price: String(body.price || existing.price),
    rating: Number(body.rating ?? existing.rating),
    summary: String(body.summary || existing.summary),
    pros: Array.isArray(body.pros) ? body.pros : existing.pros,
    cons: Array.isArray(body.cons) ? body.cons : existing.cons,
    detailed: Array.isArray(body.detailed) ? body.detailed : existing.detailed,
    amazonUrl: String(body.amazonUrl || existing.amazonUrl),
  };

  await collection.updateOne({ slug }, { $set: updateDoc });
  const review = await collection.findOne({ slug }, { projection: { _id: 0 } });
  res.json({ review });
});

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});

function toSlug(value) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function generateUniqueSlug(title, existingSlugs) {
  const base = toSlug(title || "review");
  let slug = base;
  let index = 2;
  while (existingSlugs.has(slug)) {
    slug = `${base}-${index}`;
    index += 1;
  }
  return slug;
}
