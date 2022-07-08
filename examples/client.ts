import { ProjectedRecordType } from "@haven/data-park-opening-dates-v1";
import bent from "bent";

const getJSON = bent("json");

(async () => {
  const { data: parks } = (await getJSON("http://localhost:3000/park-opening-dates/v1?date=2021-01-01&clientId=example")) as ProjectedRecordType;
  parks.forEach((park) => {
    console.log(park.code, park.openingDates.guests[0]);
  });
})();
