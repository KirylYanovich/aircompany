const PassengerPlane = require('./Planes/PassengerPlane');
const MilitaryPlane = require('./Planes/MilitaryPlane');
const militaryType = require('./models/militaryType');
const ExperimentalPlane = require('./Planes/ExperimentalPlane');

class Airport {

    constructor(planes) {
        this.planes = planes;
    }

    getPassengerPlanes() {
        return this.planes.filter(plane => plane instanceof PassengerPlane);
    }

    getMilitaryPlanes() {
        return this.planes.filter(plane => plane instanceof MilitaryPlane);
    }

    getPassengerPlaneWithMaxPassengersCapacity() {
        let passengerPlanes = this.getPassengerPlanes();
        return passengerPlanes.reduce((max, current) => max.passengersCapacity < current.passengersCapacity ? current : max);
    }

    getTransportMilitaryPlanes() {
        let militaryPlanes = this.getMilitaryPlanes();
        return militaryPlanes.filter(plane => plane.getMilitaryType() === militaryType.transport);
    }

    getBomberMilitaryPlanes() {
        let militaryPlanes = this.getMilitaryPlanes();
        return militaryPlanes.filter(plane => plane.getMilitaryType() === militaryType.bomber);
    }

    getExperimentalPlanes() {
        return this.planes.filter(plane => plane instanceof ExperimentalPlane);
    }

    /**
     * Sorts by max distance
     * @return Airport
     */
    sortByMaxFlightDistance() {
        this.planes.sort((a, b) => a.getMaxFlightDistance() - b.getMaxFlightDistance());
        return this;
    }

    /**
     * Sorts by max speed
     * @return Airport
     */
    sortByMaxSpeed() {
        this.planes.sort((a, b) => a.getMaxSpeed() - b.getMaxSpeed());
        return this;
    }

    /**
     * Sorts by max load capasity
     * @return Airport
     */
    sortByMaxLoadCapacity() {
        this.planes.sort((a, b) => a.getMaxLoadCapacity() - b.getMaxLoadCapacity());
        return this;
    }

    getPlanes() {
        return this.planes;
    }

    static getPlanesString(planes) {
        return JSON.stringify(planes);
    }
}

module.exports = Airport;