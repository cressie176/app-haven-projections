# Haven Projections Service

A proof of concept service for exposing Haven projections via a RESTful API

## API

### /:projection/:version

| Parameter  | Type    | Required | Default | Example    | Notes                                                            |
| ---------- | ------- | -------- | ------- | ---------- | ---------------------------------------------------------------- |
| projection | request | Yes      |         | data-parks | The name of the projection package                               |
| version    | request | Yes      |         | v1         | The major version number of the projection package               |
| clientId   | query   | Yes      |         | app-cms    | A string identifying the client so we can track production usage |
| date       | query   | No       | now     | 2021-01-01 | The date to use when retrieving projected data                   |

#### Example

```sh
curl -s 'http://localhost:3000/park-opening-dates/v1?date=2021-01-01&clientId=app-cms' | json_pp
```

```json
{
  "name": "@haven/data-park-opening-dates",
  "version": "1.0.0",
  "variant": "all",
  "effectiveDate": "2021-12-01T00:00:00.000Z",
  "nextEffectiveDate": "2022-12-01T00:00:00.000Z",
  "data": [
    {
      "code": "DC",
      "openingDates": {
        "guests": [
          {
            "from": "2022-03-11",
            "to": "2022-11-07"
          },
          {
            "from": "2023-03-10",
            "to": "2023-11-06"
          }
        ],
        "owners": [
          {
            "from": "2022-03-11",
            "to": "2022-11-07"
          },
          {
            "from": "2023-03-10",
            "to": "2023-11-06"
          }
        ],
        "touring": [
          {
            "from": "2022-03-11",
            "to": "2022-11-07"
          },
          {
            "from": "2023-03-10",
            "to": "2023-11-06"
          }
        ]
      }
    },
    {
      "code": "SX",
      "openingDates": {
        "guests": [
          {
            "from": "2022-03-11",
            "to": "2022-11-07"
          },
          {
            "from": "2023-03-10",
            "to": "2023-11-06"
          }
        ],
        "owners": [
          {
            "from": "2022-03-11",
            "to": "2022-11-07"
          },
          {
            "from": "2023-03-10",
            "to": "2023-11-06"
          }
        ],
        "touring": [
          {
            "from": "2022-03-11",
            "to": "2022-11-07"
          },
          {
            "from": "2023-03-10",
            "to": "2023-11-06"
          }
        ]
      }
    }
  ]
}
```

## Adding Projections

1. Install the projection using an alias so we can support multiple API versions concurrently, e.g.
   ```sh
   npm install data-park-opening-dates-v1@npm:data-park-opening-dates@1
   npm install data-park-opening-dates-v2@npm:data-park-opening-dates@2
   ```
1. Add the projection to [/src/index.ts](https://github.com/cressie176/service-haven-projections/blob/main/src/index.ts#L7-L10)

## TypeScript Usage

Even though you are requesting the data via an API you can still make use of the TypeScript definitions bundled with each projection module. e.g.

```ts
import { ProjectedRecordType } from "@haven/data-park-opening-dates-v1";
import bent from "bent";

const getJSON = bent("json");

(async () => {
  const { data: parks } = (await getJSON("http://localhost:3000/park-opening-dates/v1?date=2021-01-01&clientId=example")) as ProjectedRecordType;
  parks.forEach((park) => {
    console.log(park.code, park.openingDates.guests[0]);
  });
})();
```

```
DC { from: '2021-03-11', to: '2021-11-07' }
SX { from: '2021-03-11', to: '2021-11-07' }
```
