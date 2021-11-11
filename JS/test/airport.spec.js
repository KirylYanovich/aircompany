const assert = require('chai').assert;

const MilitaryPlane = require('../Planes/MilitaryPlane');
const PassengerPlane = require('../Planes/PassengerPlane');
const Airport = require('../Airport');
const militaryType = require('../models/militaryType');
const ExperimentalPlane = require('../Planes/ExperimentalPlane');
const experimentalTypes = require('../models/experimentalTypes');
const classificationLevel = require('../models/ClassificationLevel');

describe('My Test', () => {

    const planes = [
        new PassengerPlane('Boeing-737', 900, 12000, 60500, 164),
        new PassengerPlane('Boeing-737-800', 940, 12300, 63870, 192),
        new PassengerPlane('Boeing-747', 980, 16100, 70500, 242),
        new PassengerPlane('Airbus A320', 930, 11800, 65500, 188),
        new PassengerPlane('Airbus A330', 990, 14800, 80500, 222),
        new PassengerPlane('Embraer 190', 870, 8100, 30800, 64),
        new PassengerPlane('Sukhoi Superjet 100', 870, 11500, 50500, 140),
        new PassengerPlane('Bombardier CS300', 920, 11000, 60700, 196),
        new MilitaryPlane('B-1B Lancer', 1050, 21000, 80000, militaryType.bomber),
        new MilitaryPlane('B-2 Spirit', 1030, 22000, 70000, militaryType.bomber),
        new MilitaryPlane('B-52 Stratofortress', 1000, 20000, 80000, militaryType.bomber),
        new MilitaryPlane('F-15', 1500, 12000, 10000, militaryType.fighter),
        new MilitaryPlane('F-22', 1550, 13000, 11000, militaryType.fighter),
        new MilitaryPlane('C-130 Hercules', 650, 5000, 110000, militaryType.transport),
        new ExperimentalPlane("Bell X-14", 277, 482, 500, experimentalTypes.high_altitude, classificationLevel.secret),
        new ExperimentalPlane("Ryan X-13 Vertijet", 560, 307, 500, experimentalTypes.vtol, classificationLevel.top_secret)
    ];
    const planeWithMaxPassengerCapacity = new PassengerPlane('Boeing-747', 980, 16100, 70500, 242);

    it('should have military planes with transport type', () => {
        let airport = new Airport(planes);
        let transportMilitaryPlanes = airport.getTransportMilitaryPlanes();
        assert.isFalse(transportMilitaryPlanes.some(plane => plane.militaryType !== militaryType.transport));
    });

    it('should check passenger plane with max capacity', () => {
        let airport = new Airport(planes);
        let expectedPlaneWithMaxPassengersCapacity = airport.getPassengerPlaneWithMaxPassengersCapacity();
        assert.deepEqual(expectedPlaneWithMaxPassengersCapacity, planeWithMaxPassengerCapacity);
    });


    it('should check that planes are sorted by max load capasity ASC', () => {
        let airport = new Airport(planes);
        let planesSortedByMaxLoadCapacity = airport.sortByMaxLoadCapacity().getPlanes();
        assert.isTrue(planesSortedByMaxLoadCapacity.every((current, i, {
            [i + 1]: next
        }) => !next || current.maxLoadCapacity <= next.maxLoadCapacity))
    })

    it('should have at least one bomber in millitary planes', () => {
        let airport = new Airport(planes);
        assert.isNotEmpty(airport.getBomberMilitaryPlanes());
    })

    it('should check that experimental planes do not have unclassified classification level', () => {
        let airport = new Airport(planes);
        let experimentalPlanes = airport.getExperimentalPlanes();
        assert.isFalse(experimentalPlanes.map(plane => plane.classificationLevel).includes(classificationLevel.unclassified));
    });
});