# Haven Projections RESTful API

Exposes haven projections via a RESTful API

## API

### /:projection/:version

| Parameter | Type | Default | Example | Notes |
| --------- | ---- | ------- | ------- | ----- | 
| projection | request | | data-parks | The name of the projection module |
| version | request | | v1 | The major version number of the projection module |
| effectiveDate | query | now | 2021-01-01 | The effective date to use when retrieving projected data |

#### Example
curl http://localhost:3000/parks/v1?effectiveDate=2021-01-01

## Adding Projections

1. Install the projection using an alias so we can support multiple API versions concurrently, e.g.
   ```sh
   npm install park-1.0.00@npm:parks@1.0.0
   ```
1. Add the projection to `src/index.ts`