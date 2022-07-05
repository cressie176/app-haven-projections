# Haven Projections Service

A proof of concept service for exposing Haven projections via a RESTful API

## API

### /:projection/:version

| Parameter     | Type    | Required | Default | Example    | Notes                                                            |
| ------------- | ------- | -------- | ------- | ---------- | ---------------------------------------------------------------- |
| projection    | request | Yes      |         | data-parks | The name of the projection module                                |
| version       | request | Yes      |         | v1         | The major version number of the projection module                |
| clientId      | query   | Yes      |         | app-cms    | A string identifying the client so we can track production usage |
| effectiveDate | query   | No       | now     | 2021-01-01 | The effective date to use when retrieving projected data         |

#### Example

curl http://localhost:3000/parks/v1?effectiveDate=2021-01-01

## Adding Projections

1. Install the projection using an alias so we can support multiple API versions concurrently, e.g.
   ```sh
   npm install park-1.0.00@npm:parks@1.0.0
   ```
1. Add the projection to `src/index.ts`
