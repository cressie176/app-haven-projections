import express, { Request, Response } from "express";
import helmet from "helmet";
import parks_v1 from "@cressie176/data-parks-v1/all";
import parks_v2 from "@cressie176/data-parks-v2/all";
import parkOpeningDates_v1 from "@cressie176/data-park-opening-dates-v1/all";

const projections = new Map<string, any>();
projections.set("parks_v1", parks_v1);
projections.set("parks_v2", parks_v2);
projections.set("park-opening-dates_v1", parkOpeningDates_v1);

const app = express();

app.use(helmet());

app.get("/:projection/:version", async (req: Request, res: Response) => {
  const clientId = req.query.clientId;
  if (!clientId) {
    res.status(400).json(`A clientId is required`);
    return;
  }

  const key = `${req.params.projection}_${req.params.version}`;
  const projection = projections.get(key);
  if (!projection) {
    res.status(404).json(`Unknown projection: ${req.params.projection}`);
    return;
  }

  let effectiveDate = new Date();
  if (req.query.effectiveDate) {
    const timestamp = Date.parse(req.query.effectiveDate as string);
    if (isNaN(timestamp)) return res.status(400).json("Invalid timestamp");
    effectiveDate = new Date(timestamp);
  }

  const temporalData = projection.get(effectiveDate);
  if (!temporalData) {
    res.status(404).json(`No data for effectiveDate: ${effectiveDate.toISOString()}`);
    return;
  }
  res.setHeader("max-age", 300);
  res.json(temporalData);
});

app.listen(3000, () => {
  console.log("ready");
});
