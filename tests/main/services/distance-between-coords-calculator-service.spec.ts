import { DistanceBetweenCoordinatesCalculatorService } from "@/data/services";

const makeSut = () => {
  return new DistanceBetweenCoordinatesCalculatorService();
};

describe("DistanceBetweenCoordinatesCalculatorService", () => {
  it("Should calculate distance between Vitoria Airport and Luma Health's office", () => {
    const sut = makeSut();

    const vixLat = 20.26;
    const vixLon = -40.28;

    const lumaLat = 37.79;
    const lumaLon = -122.4;

    const distance = sut.calculate(vixLat, vixLon, lumaLat, lumaLon);

    // * Google seems to agree with 7974km...
    expect(distance).toBeCloseTo(7974, 0);
  });

  it("Should calculate distance between Los Pollos Hermanos and Walter White's house", () => {
    const sut = makeSut();

    const losPollosLat = 35.014497;
    const losPollosLon = -106.685953;

    const walterHouseLat = 35.126125;
    const walterHouseLon = -106.536788;

    const distance = sut.calculate(
      losPollosLat,
      losPollosLon,
      walterHouseLat,
      walterHouseLon
    );

    expect(distance).toBeCloseTo(18, 0);
  });

  it("Should return 0 when calculating distance between same points", () => {
    const sut = makeSut();

    const lat = 51.5074;
    const lon = -0.1278;

    const distance = sut.calculate(lat, lon, lat, lon);

    expect(distance).toBe(0);
  });

  it("Should calculate the distance between north pole and south pole", () => {
    const sut = makeSut();

    const northPoleLat = 90.0;
    const northPoleLon = 0.0;

    const southPoleLat = -90.0;
    const southPoleLon = 0.0;

    // * (Along meridian)
    const earthCircumference = 40_030;

    const distance = sut.calculate(
      northPoleLat,
      northPoleLon,
      southPoleLat,
      southPoleLon
    );
    expect(distance).toBeCloseTo(earthCircumference / 2, 0);
  });

  it("Should still work even if inputs are stringified numbers", () => {
    const sut = makeSut();

    const latStr = "-90.0";
    const lngStr = "0.0";

    const distance = sut.calculate(
      // @ts-expect-error
      latStr,
      lngStr,
      latStr,
      lngStr
    );

    expect(distance).toBe(0);
  });
});
