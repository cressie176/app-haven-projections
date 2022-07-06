import { ParkOpeningDatesType } from "data-park-opening-dates-1.0.0";
import bent from "bent";

const getJSON = bent("json");

(async () => {
  const parks = (await getJSON("http://localhost:3000/park-opening-dates/v1?effectiveDate=2021-01-01&clientId=example")) as ParkOpeningDatesType[];
  parks.forEach((park) => {
    console.log(park.code, park.openingDates.guests[0]);
  });
})();
