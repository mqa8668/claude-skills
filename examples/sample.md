# Acme Logistics - Platform Overview

## Summary

Acme Logistics runs its dispatch API on two sites. This note describes the current layout
and the one change we propose: move the job queue to a three-node cluster so a single node
failure no longer pauses dispatch.

> **Note:** figures below are illustrative sample data.

## Current layout

| Component | Count | Role |
|---|---|---|
| Load balancer | 2 | Terminates TLS, active/passive |
| API node | 4 | Stateless dispatch API |
| Queue node | 2 | Job queue, single leader |
| Database | 1 | PostgreSQL primary with one replica |

## Proposed change

1. Replace the two-node queue with a three-node cluster, so a majority survives one failure.
2. Keep the database as is for now.
3. Test failover once per quarter.

Estimated effort is 6 working days; no change to the public API.
