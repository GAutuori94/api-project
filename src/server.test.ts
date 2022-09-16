import supertest from "supertest";

import { prismaMock } from "./lib/prisma/client.mock";

import app from "./app";

const request = supertest(app);

describe("GET /planets", () => {
    test("Valid request", async () => {
        const planets = [
            {
                id: 1,
                name: "Mercury",
                description: null,
                diameter: 123,
                moons: 12,
                createdAt: "2022-09-16T16:47:18.402Z",
                updatedAt: "2022-09-16T16:46:52.876Z",
            },
            {
                id: 2,
                name: "Mars",
                description: null,
                diameter: 456,
                moons: 0,
                createdAt: "2022-09-16T16:47:51.629Z",
                updatedAt: "2022-09-16T16:47:35.603Z",
            },
        ];

        // @ts-ignore
        prismaMock.planet.findMany.mockResolvedValue(planets);

        const response = await request
            .get("/planets")
            .expect(200)
            .expect("Content-Type", /application\/json/);

        expect(response.body).toEqual(planets);
    });

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    describe("POST /planets", () => {
        test("Valid request", async () => {
            const planet = {
                name: "Mercury",
                diameter: 123,
                moons: 12,
            };

            const response = await request
                .post("/planets")
                .send(planet)
                .expect(201)
                .expect("Content-Type", /application\/json/);

            expect(response.body).toEqual(planet);
        });

        test("Invalid request", async () => {
            const planet = {
                // name required not passed
                diameter: 123,
                moons: 12,
            };

            const response = await request
                .post("/planets")
                .send(planet)
                .expect(422)
                .expect("Content-Type", /application\/json/);

            expect(response.body).toEqual({
                errors: {
                    body: expect.any(Array),
                },
            });
        });
    });
});
