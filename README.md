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

```sh
curl -s 'http://localhost:3000/park-opening-dates/v1?effectiveDate=2021-01-01&clientId=app-cms' | json_pp
```

```json
[
   {
      "code" : "DC",
      "openingDates" : {
         "guests" : [
            {
               "from" : "2021-03-11",
               "to" : "2021-11-07"
            },
            {
               "from" : "2022-03-10",
               "to" : "2022-11-06"
            }
         ],
         "owners" : [
            {
               "from" : "2021-03-11",
               "to" : "2021-11-07"
            },
            {
               "from" : "2022-03-10",
               "to" : "2022-11-06"
            }
         ],
         "touring" : [
            {
               "from" : "2021-03-11",
               "to" : "2021-11-07"
            },
            {
               "from" : "2022-03-10",
               "to" : "2022-11-06"
            }
         ]
      }
   },
   {
      "code" : "SX",
      "openingDates" : {
         "guests" : [
            {
               "from" : "2021-03-11",
               "to" : "2021-11-07"
            },
            {
               "from" : "2022-03-10",
               "to" : "2022-11-06"
            }
         ],
         "owners" : [
            {
               "from" : "2021-03-11",
               "to" : "2021-11-07"
            },
            {
               "from" : "2022-03-10",
               "to" : "2022-11-06"
            }
         ],
         "touring" : [
            {
               "from" : "2021-03-11",
               "to" : "2021-11-07"
            },
            {
               "from" : "2022-03-10",
               "to" : "2022-11-06"
            }
         ]
      }
   }
]
```

## Adding Projections

1. Install the projection using an alias so we can support multiple API versions concurrently, e.g.
   ```sh
   npm install park-opening-dates-1.0.00@npm:park-opening-dates@1.0.0
   ```
1. Add the projection to `src/index.ts`
