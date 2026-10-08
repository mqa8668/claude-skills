# Acme Logistics - Platform Migration Proposal

## Summary

Acme Logistics runs its dispatch platform on two sites in a single failure domain. A quorum
loss on the job queue pauses dispatch for every depot until someone intervenes by hand. This
proposal moves the queue to a three-node cluster, adds a warm standby for the database and
retires the manual failover runbook. No change to the public API.

> **Note:** all figures in this document are illustrative sample data for a fictional customer.

## Investment at a glance

| Item | Effort | Fee (USD) |
|---|---|---|
| Queue cluster (3 nodes) and cutover | 6 days | 3,900 |
| Database warm standby and failover test | 4 days | 2,600 |
| Monitoring, alerts and runbook | 3 days | 1,950 |
| Hypercare (2 weeks, remote) | 2 days | 1,300 |
| **Total** | **15 days** | **9,750** |

## Current layout

| Component | Count | Role | Risk today |
|---|---|---|---|
| Load balancer | 2 | Terminates TLS, active/passive | Low |
| API node | 4 | Stateless dispatch API | Low |
| Queue node | 2 | Job queue, single leader | High: no quorum with one node down |
| Database | 1 | PostgreSQL primary, one async replica | Medium: manual promotion |

## Proposed change

1. Replace the two-node queue with a three-node cluster, so a majority survives one failure.
2. Add a warm standby for the database with a tested promotion procedure.
3. Alert on queue depth and replica lag; page the on-call before depots notice.
4. Test failover once per quarter and record the result.

## Timeline and acceptance

| Phase | Weeks | Done when |
|---|---|---|
| Build | 1-2 | Cluster is up in staging and passes the failure drill |
| Cutover | 3 | Dispatch runs on the new queue for 7 days without a manual action |
| Hypercare | 4-5 | Two failover tests pass; runbook accepted by Acme operations |

Estimated effort is 15 working days over five weeks. Contact: ops@example.com.
