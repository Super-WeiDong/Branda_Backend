const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * Schema to describe a Vehicle.
 */
let VehicleSchema = new Schema({
  /**
   * Make of this Vehicle
   */
  make: {
    type: String
  },
  /**
   * Model of this Vehicle
   */
  model: {
    value: {type: String},
    year:{type:Number}
  },
  /**
   * MPG (Miles Per Gallon) or range (for EVs)
   */
  mpgOrRange: {
    value: {type: Number},
    unit: {type: String, default: "miles"}
  },
  /**
   * Odometer miles of this Vehicle
   */
  odometerMiles: {
    value: {type: Number},
    unit: {type: String, default: "miles"}
  },
  /**
   * Engine type (gas, hybrid, or EV) of this Vehicle
   */
  engineType: {
    type: String
  },
  /**
   * Display name of this Vehicle
   */
  displayName: {
    type: String
  },
  /**
   * VIN (unique alphanumeric identifier)
   */
  VIN: {
    type: String
  }
});

let Vehicle = mongoose.model("Vehicle", VehicleSchema);
module.exports = Vehicle;