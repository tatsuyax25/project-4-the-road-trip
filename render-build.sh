#!/usr/bin/env bash
# Build script for Render deployment

# Install dependencies with legacy peer deps
npm install --legacy-peer-deps

# Build the React app
npm run build